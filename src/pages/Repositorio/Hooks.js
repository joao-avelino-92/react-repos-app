import { useState, useEffect } from "react";
// import { Container, Owner, Loading, BackButton, IssuesList, PageActions } from "./styles";
// import { FaArrowLeft } from "react-icons/fa";
import api from "../../services/api";
export const useRepositorio =(match)=>{

  const [repositorio, setRepositorio] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState([
    {state: 'all', label: 'todas', active: true},
    {state: 'open', label: 'abertas', active: false},
    {state: 'closed', label: 'fechadas', active: false},
  ]);
  const [filterIndex, setFilterIndex] = useState(0);

  useEffect(() => {
    async function load() {
      const nomeRepo = decodeURIComponent(match.params.repositorio);

      const [repositorioData, issuesData] = await Promise.all([
        api.get(`/repos/${nomeRepo}`),
        api.get(`/repos/${nomeRepo}/issues`, {
          params: {
            state: filters.find(f => f.active).state,
            per_page: 5,
          },
        }),
      ]);

      setRepositorio(repositorioData.data);
      setIssues(issuesData.data);
      // console.log(issuesData.data);

      setLoading(false);
    }

    load();
  }, [match.params.repositorio, filters]);


  useEffect(() => {

    async function loadIssue(){
      const nomeRepo = decodeURIComponent(match.params.repositorio);

      const response = await api.get(`/repos/${nomeRepo}/issues`, {
        params:{
          state: filters[filterIndex].state,  
          page, 
          per_page: 5,
        }
      });
      setIssues(response.data);
      console.log(filterIndex);
    }

    loadIssue();

  }, [match.params.repositorio, page, filterIndex, filters]);

  function handlePage(action){
    setPage(action === 'back' ? page - 1 : page + 1);
  }

  function handleFilter(index){
    setFilterIndex(index);
  }

  return {repositorio,issues,handlePage,loading, page, filters, filterIndex, handleFilter}
}

