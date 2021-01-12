var birthday = document.querySelector("#birthday");
var submit = document.querySelector("#btn-check");
var output = document.querySelector("#output");
var loadingGif = document.querySelector("#loading-gif");
var outputGif = document.querySelector("#output-gif");
var results = [];


function checkPalindrome(birthdate) {

    let rev = birthdate.split('').reverse('').join('');
    return rev === birthdate;
}

function dateToStr(d) {

    let dd = "";
    if (d.getDate() < 10) {
        dd = "0" + String(d.getDate());
    } else {
        dd = String(d.getDate());
    }
    if (d.getMonth() < 9) {
        dd = dd + "0" + String(d.getMonth() + 1);
    } else {
        dd = dd + String(d.getMonth() + 1);
    }
    dd += String(d.getFullYear());
    return dd;
}

function diffDays(dd, mm, yy) {

    dd = Number(dd);
    mm = Number(mm);
    yy = Number(yy);
    let d = new Date(yy, mm - 1, dd);
    while (!checkPalindrome(dateToStr(d))) {
        d.setDate(d.getDate() + 1);
    }
    
    let nextPalDate = d;
    let thisDate = new Date(birthday.value);
    let diff = nextPalDate.getTime() - thisDate.getTime();

    let diff_days = diff / (1000 * 3600 * 24);
    return diff_days;
}


function onSubmit() {

    output.innerText = "Calculating... Checking all possible combinations";
    output.style.color = '#4fa11b';
    outputGif.style.display = 'none';
    loadingGif.style.display = 'block';
    loadingGif.src = "";
    loadingGif.src = "/images/loading.gif";

    setTimeout(() => {
        var birthdayString = birthday.value;
    
        var fields = birthdayString.split('-');
        
        console.log(fields);

        var differenceDays = (diffDays(fields[2], fields[1], fields[0]));
    
        results = [];
    
        for (let i = 0; i < fields.length; i++) {
            results.push(`${fields[i]}${fields[(i+1)%3]}${fields[(i+2)%3]}`);
            results.push(`${fields[i]}${fields[(i+2)%3]}${fields[(i+1)%3]}`);
        }
    
        for(i=0; i<results.length; i++) {
            let reverseString = results[i].split("").reverse().join("");
            if(results[i] === reverseString)
                {
                    loadingGif.style.display = 'none';
                    outputGif.style.display = 'block';
                    output.innerText = "Yes, your birthday is a Palindrome!";
                    output.style.color = '#3730A3';
                    outputGif.src = "";
                    outputGif.src = "/images/yes.gif";
                }
            else
                {
                    loadingGif.style.display = 'none';
                    outputGif.style.display = 'block';
                    output.innerText = "No, your birthday is not a palindrome. You missed it by " + Math.round(differenceDays) + " days.";
                    output.style.color = '#e61313';
                    outputGif.src = "";
                    outputGif.src = "/images/no.gif";
                }
        }
        }, 2500);

}

submit.addEventListener("click", onSubmit);