var searchRepositories = () => {
  var searchTerms = $("#searchTerms").val();
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, data => {
    $("#results").html(renderSearchResults(data));
  }).fail(error => {
    displayError();
  });
};

var displayError = () => $('#errors').html("I'm sorry, there's been an error. Please try again.");

var renderSearchResults = (data) => data.items.map( result => renderSearchResult(result));

var renderSearchResult = (result) => {
  return `
   <div>
     <h2><a href="${result.html_url}">${result.name}</a></h2>
     <p>${result.description}</p>
     <p><a href="#" data-repository="${result.name}" data-owner="${result.owner.login}"
onclick="showCommits(this)">Show Commits</a></p>
   </div>
   `;
};


var showCommits = (el) => {
  $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, data => {
    $("#details").html(renderCommits(data));
  }).fail(error => {
    displayError();
  });
};

var renderCommits = (data) =>{
  let result = data.map((commit)=>renderCommit(commit)).join('');
  return `<ul>${result}</ul>`;
};

var renderCommit = (commit) => {
  return `<li><h3>${commit.sha}</h3><p>${commit.commit.message}</p></li>`;
};




$(document).ready(function (){
});
