*** Settings ***
Library    SeleniumLibrary

*** Test Cases ***
Fill DemoQA Form

    Open Browser    https://demoqa.com/text-box    chrome
    Maximize Browser Window

    Input Text    id:userName    Nouman
    Input Text    id:userEmail    nouman@test.com
    Input Text    id:currentAddress    Lahore
    Input Text    id:permanentAddress    Pakistan

    Execute Javascript    window.scrollTo(0, document.body.scrollHeight)
    Sleep    2s

    Execute Javascript    document.getElementById('submit').click()
    Page Should Contain    Nouman

    Sleep    5s
    Close Browser