function sign(){
    var appliForm = document.getElementById("application");
    var schoolNumber = appliForm.schoolNum.value;
    var name = appliForm.name.value;
    var firstClub1 = appliForm.firstClub1.options[appliForm.firstClub1.options.selectedIndex].value;
    var firstClub2 = appliForm.firstClub2.options[appliForm.firstClub2.options.selectedIndex].value;
    var secondClub1 = appliForm.secondClub1.options[appliForm.secondClub1.options.selectedIndex].value;
    var secondClub2 = appliForm.secondClub2.options[appliForm.secondClub2.options.selectedIndex].value;
    console.log(schoolNumber,name, firstClub1, firstClub2, secondClub1, secondClub2)

    if (!schoolNumber || !name || !firstClub1 || !firstClub2 || !secondClub1 || !secondClub2) {
        M.toast({html: '모두 입력하세요.',inDuration: 200, outDuration:200})
        return
    } else if(isNaN(schoolNumber) || schoolNumber.length != 5 ) {
        M.toast({html: '올바른 학번을 입력하세요.',inDuration: 200, outDuration:200})
        return
    } else if (firstClub1 == firstClub2 || secondClub1 == secondClub2) {
        M.toast({html: '동아리를 중복해서 신청할 수 없습니다.',inDuration: 200, outDuration:200})
        return
    } else if (secondClub1 == "none" && secondClub2 != "none") {
        M.toast({html: '희망 동아리가 1개일 경우 2지망을 없음으로 표시하세요.',inDuration: 200, outDuration:200})
        return
    }

    var ClubList = [firstClub1, firstClub2, secondClub1, secondClub2]
    const ClubInfo = ["1지망 제1동아리", "2지망 제1동아리", "1지망 제2동아리", "2지망 제2동아리"]
    for (var i = 0; i < ClubList.length; i++) {
        if (getDeadline(ClubList[i]).valueOf() < getToday().valueOf()) {
            M.toast({html: `${ClubInfo[i]} 의 신청 가능 기간이 끝나, 신청할 수 없습니다.`, inDuration: 200, outDuration:200})
            return
        }
    }

    M.toast({html: '로딩중...',inDuration: 200, outDuration:200})
    fetch("https://script.google.com/macros/s/AKfycbykBSZN_j6GgkcGJdsDC60N8vCYk5h0fXzCCTs7knNpaoqXYg25JYUpsG69J7XW0a9qJQ/exec", {
    method: "POST",
    contentType: "application/json",
    body: JSON.stringify({
        number : schoolNumber,
        name : name,
        firstClub1 : firstClub1,
        firstClub2 : firstClub2,
        secondClub1 : secondClub1,
        secondClub2 : secondClub2,
    }),
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.result == "modify") {
            M.toast({html: '수정되었습니다.',inDuration: 200, outDuration:200})
        } else if (data.result == "success") {
            M.toast({html: '신청되었습니다.',inDuration: 200, outDuration:200})
        }
    });
    return
    
}

function getDeadline(ClubName) {
    return getSampleDeadline()
}

// Hard-coded waiting for db fetch
const DEADLINE = "2024-03-08T00:00:00.000+09:00"
function getSampleDeadline() {
    return new Date(DEADLINE)
}

function getToday() {
    return new Date()
}

function getResult(){
    if (data) {
        M.toast({html: '로딩중...',inDuration: 200, outDuration:200})
    } else {
        M.toast({html: '잠시후 다시 시도하세요.',inDuration: 200, outDuration:200})
        return;
    }
    var studentNumber = document.getElementById("schoolNumber").value;
    let url = 'https://script.google.com/macros/s/AKfycbzfbe5QY78FZqTJbOjmoTo6KO1s9LzUPrVai-WoI_GphqZ-JO9yjU1egDBauwySJzzfDA/exec'
    fetch(url,{
        method: "POST",
        contentType: "application/json",
        body: JSON.stringify({
            number : studentNumber
        }),
        })
        .then(response => response.json())
        .then(json => {
            console.log(json)
            student = json
            var resultFirstClub1 = document.getElementById("resultFirstClub1");
            var myselfFirstClub1 = document.getElementById("myselfFirstClub1");
            var passOrNotFirstClub1 = document.getElementById("passOrNotFirstClub1");
            var resultFirstClub2 = document.getElementById("resultFirstClub2");
            var myselfFirstClub2 = document.getElementById("myselfFirstClub2");
            var passOrNotFirstClub2 = document.getElementById("passOrNotFirstClub2");
            var resultSecondClub1 = document.getElementById("resultSecondClub1");
            var myselfSecondClub1 = document.getElementById("myselfSecondClub1");
            var passOrNotSecondClub1 = document.getElementById("passOrNotSecondClub1");
            var resultSecondClub2 = document.getElementById("resultSecondClub2");
            var myselfSecondClub2 = document.getElementById("myselfSecondClub2");
            var passOrNotSecondClub2 = document.getElementById("passOrNotSecondClub2");

            if (student.firstClub1 != "none"){
                resultFirstClub1.innerHTML = data[student.firstClub1].name;
                myselfFirstClub1.innerHTML = `<a href='${data[student.firstClub1].link}' target='_blank'>클릭</a>`;
                passOrNotFirstClub1.innerHTML = student.passOrNotFirstClub1;
                passOrNotFirstClub1.style.color = color(student.passOrNotFirstClub1);
            }
            else {
                resultFirstClub1.innerHTML = '-';
                myselfFirstClub1.innerHTML = '-';
                passOrNotFirstClub1.innerHTML = '-';
                passOrNotFirstClub1.style.color = 'var(--black-color)';
            }

            if (student.firstClub2 != "none") {
                resultFirstClub2.innerHTML = data[student.firstClub2].name;
                myselfFirstClub2.innerHTML = `<a href='${data[student.firstClub2].link}' target='_blank'>클릭</a>`;
                passOrNotFirstClub2.innerHTML = student.passOrNotFirstClub2;
                passOrNotFirstClub2.style.color = color(student.passOrNotFirstClub2);
            }
            else {
                resultFirstClub2.innerHTML = '-';
                myselfFirstClub2.innerHTML = '-';
                passOrNotFirstClub2.innerHTML = '-';
                passOrNotFirstClub2.style.color = 'var(--black-color)';
            }

            if (student.secondClub1 != "none") {
                resultSecondClub1.innerHTML = data[student.secondClub1].name;
                myselfSecondClub1.innerHTML = `<a href='${data[student.secondClub1].link}' target='_blank'>클릭</a>`;
                passOrNotSecondClub1.innerHTML = student.passOrNotSecondClub1;
                passOrNotSecondClub1.style.color = color(student.passOrNotSecondClub1);
            }
            else {
                resultSecondClub1.innerHTML = '-';
                myselfSecondClub1.innerHTML = '-';
                passOrNotSecondClub1.innerHTML = '-';
                passOrNotSecondClub1.style.color = 'var(--black-color)';
            }

            if (student.secondClub2 != "none") {
                resultSecondClub2.innerHTML = data[student.secondClub2].name;
                myselfSecondClub2.innerHTML = `<a href='${data[student.secondClub2].link}' target='_blank'>클릭</a>`;
                passOrNotSecondClub2.innerHTML = student.passOrNotSecondClub2;
                passOrNotSecondClub2.style.color = color(student.passOrNotSecondClub2);
            }
            else {
                resultSecondClub2.innerHTML = '-';
                myselfSecondClub2.innerHTML = '-';
                passOrNotSecondClub2.innerHTML = '-';
                passOrNotSecondClub2.style.color = 'var(--black-color)';
            }

        }).catch(() => {
            M.toast({html: '학번이 올바르지 않아요.',inDuration: 200, outDuration:200})
            console.log('error')
    });
}

function color(text) {
    if (text == "합격") {
        return 'var(--green-color)'
    } else if (text == "불합격") {
        return 'var(--red-color)'
    } else if (text == "검토중") {
        return 'var(--yellow-color)'
    }
}