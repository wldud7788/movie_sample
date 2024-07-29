const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjJlOWIyZWNkMmI1MDIwN2YzMWU2NzFhMDU3NzRmNSIsIm5iZiI6MTcyMTkxNjYxOC43MTM4NTgsInN1YiI6IjY2YTI1YWMxY2EyMzA4N2I0YWNmODgwYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.k8F1VMfOMPodILUqqlXGQXrOEgkbQGiJ8w_vnWFM_nE'
  }
};
function getMovieData(serchText) {
  let url = "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";
  // 검색어가 있을 경우에는 검색 관련 url을 붙여준다.
  if(serchText) {
    url = `https://developer.themoviedb.org/reference/search-movie?query=${searchText}`;
  }
  //원래 그려져 있던 부모 컨테이너를 한 번 지워준다.
  let parentHtml = document.getElementById('movie-container');
  parentHtml.innerHTML = '';

  // fetch를 통한 데이터 가져오기 + 카드 그려주는 로직 
  fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',options).then((response) => {
    response.json()
    .then(response => {
      let movie_list = response['results'];
      console.log(response)
      let temp_html = ``;
      movie_list.forEach((i) => {
        let img_url = 'https://image.tmdb.org/t/p/w500' + i['poster_path'];
        let movie_title = i['title'];
        let overview = i['overview'];
        let vote = i['vote_average'];
        let id = i['id'];
  
        temp_html += `
            <div class="movie-card" id="${id}" onclick="alert('영화 ID: ${id}')">
                <img src="${img_url}" alt="영화이미지">
                <div class="text_area">
                  <h3>${movie_title}</h3>
                  <p>${overview}</p>
                  <span>평점 : ${vote}</span>
                </div>
                
            </div>
          `;
        document.getElementById('movie-container').innerHTML = temp_html;
  
      });
    });
  })
}

//기본적으로 getMovieData를 호출하여 기본 디폴트 화면을 표시해줌
getMovieData();
// 서치 함수, 버튼 클릭 이벤트 쪽에서 onclick시 실행되도록 처리 
function search() {
  let text = document.getElementsByClassName('searchInput');
  getMovieData(text);
};

let searchBtn = document.getElementById('search_btn');
searchBtn.onclick = () => {
  search();
};


