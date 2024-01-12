import { dbank } from "../../declarations/dbank_backend/dbank_backend.did"
import "../assets/main.css"
// import "../assets/dbank_logo.png"


window.addEventListener("load", async function () {
    console.log("pingon");
    update()
})


document.querySelector("form").addEventListener("submit", async function(event) {
    event.preventDefault()

    console.log("submit")

    const button = event.target.querySelector("#submit-btn")

    const inputAmount = parseFloat(document.getElementById("input-amount").value)
    const outputAmount = parseFloat(document.getElementById("withdrawl-amount").value)


    button.setAttribute("disabled", true)

    if (document.getElementById("input-amount").value.length != 0) {
        await dbank.topUp(inputAmount)
    } 

    if (document.getElementById("withdrawl-amount").value.length != 0) {
        await dbank.withdrawl(outputAmount)
    }

    // Compound the value by the interest
    await dbank.compound()

    update()

    document.getElementById("input-amount").value = ""
    document.getElementById("withdrawl-amount").value = ""

    button.removeAttribute("disabled")


});

async function update() {
    const currentAmount = await dbank.checkBalance()
    // value is the h1 HTML element
    document.getElementById("value").innerText = Math.round(currentAmount * 100) / 100
}



