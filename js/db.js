let data;

function loadClubList(){
    let url = 'https://script.google.com/macros/s/AKfycbz48SfrCNoyzAC2Y4cassb96sI35bHVK6wXZ12gB4x9yr6JPzBeerH7Tj_DONO6js4ziQ/exec'
    fetch(url)
        .then(response => response.json())
        .then(json => {
            console.log(json)
            data = json.list
            var firstClubExplain = document.getElementById('firstClubExplain')
            var secondClubExplain = document.getElementById('secondClubExplain')
            var firstClub1 = document.getElementById('firstClub1')
            var firstClub2 = document.getElementById('firstClub2')
            var secondClub1 = document.getElementById('secondClub1')
            var secondClub2 = document.getElementById('secondClub2')
            var firstList = document.getElementById('firstList')
            var secondList = document.getElementById('secondList')
            firstClubExplain.innerHTML = ''
            secondClubExplain.innerHTML = ''
            firstClub1.innerHTML = `<option value="" selected disabled hidden >1지망 제1동아리를 선택해주세요.</option>`
            firstClub2.innerHTML = `<option value="" selected disabled hidden >2지망 제1동아리를 선택해주세요.</option>`
            secondClub1.innerHTML = `<option value="" selected disabled hidden >1지망 제2동아리를 선택해주세요.</option>`
            secondClub2.innerHTML = `<option value="" selected disabled hidden >2지망 제2동아리를 선택해주세요.</option>`
            for (let i in data) {
                if (data[i].group == 1) {
                    firstList.innerHTML += `<div class="${i}" onclick="moveY(${i},1)">${data[i].name}</div>`
                    firstClub1.innerHTML += `<option value=${i}>${data[i].name}</option>`
                    firstClub2.innerHTML += `<option value=${i}>${data[i].name}</option>`
                    firstClubExplain.innerHTML += clubContainer(data[i])
                } else if (data[i].group == 2) {
                    secondList.innerHTML += `<div class="${i}" onclick="moveY(${i-10},2)">${data[i].name}</div>`
                    secondClub1.innerHTML += `<option value=${i}>${data[i].name}</option>`
                    secondClub2.innerHTML += `<option value=${i}>${data[i].name}</option>`
                    secondClubExplain.innerHTML += clubContainer(data[i])
                }
            }
            firstClub2.innerHTML += `<option value=none>없음</option>`
            secondClub2.innerHTML += `<option value=none>없음</option>`
        }).catch(() => {
            console.log('error')
    });
};

function clubContainer(data) {
    var container = `
    <div id="${data.name}" style="display:flex;">
    <div class="clubPoster">
        <img style="height:720px; margin: auto;" src="${data.poster}.png" onerror="this.style.display='none'" alt="" referrerpolicy="no-referrer">
    </div>
    <div style="height: 720px; width: 50%;">
        <div style="height: 195px;">
            <div style="width:62px;height:62px;display:flex;justify-contents:center;"><img style="width: auto; text-align: left;" src="${data.logo}.png" onerror="this.style.display='none'" alt="" referrerpolicy="no-referrer"></div>
            <p class="clubName">${data.name}</p>
        </div>
        <div class="clubType">제${data.group}동아리</div>
        <div class="clubSubject">${data.subject}</div>
        <div class="clubIntroTitle">소개</div>
        <div class="clubIntro">
            ${data.intro}
        </div>
        <footer style="margin-top: auto; margin-bottom: 17px;">
            <div style="text-align: center; margin: 28px; display: flex; align-items: center; justify-content: center;">
                <div class="clubInterview">면접<br>${data.interview}</div>
                <div class="clubMyself">자소서<br>${data.myself}</div>
            </div>
            <div class="clubInterviewDate">면접 일시 - ${data.date}</div>
            </div>
        </footer>
    </div>
    </div>`;
    return container;
}

function moveY(cnt, group) {
    if (group == 1) {
        var clubExplain = document.getElementById("firstClubExplain");
    } else if (group == 2) {
        var clubExplain = document.getElementById("secondClubExplain");
    }
    clubExplain.style.transform = `translateY(-${cnt*720}px)`
}
