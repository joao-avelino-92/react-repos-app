import React from "react";
import { Container, Owner, Loading, BackButton, IssuesList, PageActions, FilterList } from "./styles";
import { FaArrowLeft } from "react-icons/fa";
import { useRepositorio } from "./Hooks";

export default function Repositorio({ match }) {
  
  const {repositorio,issues,handlePage,loading, page, filters, filterIndex, handleFilter} =useRepositorio(match);
  
  if (loading) {
    return (
      <Loading>
        <h1>Carregando...</h1>
      </Loading>
    );
  }
  return (
    <Container>
      <BackButton to="/">
        <FaArrowLeft color="#000" size={30} />
      </BackButton>

      <Owner>
        <img src={repositorio.owner.avatar_url} alt={repositorio.owner.login} />
        <h1>{repositorio.name}</h1>
        <p>{repositorio.description}</p>
      </Owner>

      <FilterList active={filterIndex}>
      { filters.map((filter, index) => (
          <button type="button" key={filter.label} onClick={() => handleFilter(index)}>
            {filter.label}
          </button> 
        ))}
      </FilterList>


      <IssuesList>
        {issues.map((issue) => (
          <li key={String(issue.id)}>
            <img src={issue.user.avatar_url} alt={issue.user.login} />

            <div>
              <strong>
                <a href={issue.html_url}>{issue.title}</a>

                {issue.labels.map((label) => (
                  <span key={String(label.id)}>{label.name}</span>
                ))}
              </strong>

              <p>{issue.user.login}</p>
            </div>
          </li>
        ))}
      </IssuesList>
        
      <PageActions>
        <button type="button" onClick={() => handlePage('back')} disabled={page < 2}>
          Anterior
        </button>
        <button type="button" onClick={() => handlePage('next')}>
          Próxima
        </button>
      </PageActions>
    </Container>
  );
}
