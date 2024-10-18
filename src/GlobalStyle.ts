import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, input, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video, textarea {
	    margin: 0;
	    padding: 0;
	    border: 0;
	    font-size: 100%;
	    vertical-align: baseline;
        box-sizing: border-box;
        font-family: "Plus Jakarta Sans", sans-serif;
        --webkit-appearance: none;
        appearance: none;
        overflow-x: hidden;
    }

    :root {
        --primary-bg-color: #131619;
        --grey-border-color: #363A3D;
        --white-text-color: #FFFFFF;
        --grey-otp-color: #D0D5DD;
        --grey-text-color: #ABB8C4;
        --input-focus-color: linear-gradient(#82DBF7, #B6F09C);
        --input-bg-color: #1A1D21;
        --input-holder-color: #76828D;
        --option-btn-color: linear-gradient(#4D62E5, #87DDEE, #B6F09C);
        --card-bg-color: linear-gradient(to bottom right, #D7EDED29, #CCEBEB00);
        --dialogue-bg-color: #1A1D21F5;
        --dropdown-bg-color: #0F1113;
        --green: #24AE7C;
        --bg-green: #0D2A1F;
        --red: #F37877;
        --bg-red: #3E1716;
        --btn-red: #F24E43;
        --blue: #79B5EC;
        --bg-blue: #152432;
        --table-text-color: #E8E9E9;
        --table-dark-bg: #0D0F10;
        --table-light-bg: #1C2023;
        --shade-color: #060708A3;
        --success-details-border: #363A3D99;
        font-family: "Plus Jakarta Sans", sans-serif;
    }

    :root, #root {
        width: fit-content;
        min-width: 100dvw;
        height: fit-content;
        min-height: 100dvh;
        background: var(--primary-bg-color);
        font-size: 16px;
        font-optical-sizing: auto;
        color: var(--white-text-color);
    }

    ::-webkit-scrollbar {
        width: 7px;
        border-radius: 16px;
    }         

    ::-webkit-scrollbar-track {
        background: transparent; 
       
    }

    ::-webkit-scrollbar-thumb {
        background-color: var(--green); 
        border-radius: 8px;  
    }

    select, option {
        appearance: none;
        -webkit-appearance: none;
    }

    
    label {
        display: flex;
        flex-direction: column;
        font-weight: 500;
        color: var(--grey-text-color);
        gap: 12px;
        font-size: .85rem;
    }

    .logo {
        position: absolute;
        width: 98%;
        padding: 12px 24px;
        top: 10px;
        left: 1%;
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: black;
        img {
            transform: scale(.85);
        }
    }

    .default-logo {
        position: absolute;
        top: 35px;
        left: 160px;
    }

    .modal-center {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        div {
            max-width: 560px;
        }

        main {
            min-width: 420px;
            margin-top: 20px;
        }

        footer {
            width: 100%;
            margin-top: 30px;
        }
    }

    .shade {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--shade-color);
        backdrop-filter: blur(1px);
    }

    .flex-container {
        display: flex;
        gap: 15px;
    }

    #main-img {
        position: absolute;
        width: 30%;
        top: 0;
        right: 0;
        height: 100dvh;
        min-height: 100dvh;
        border-radius: 24px 0 0 24px;
    }

    a {
        text-decoration: none; 
        color: inherit; 
    }

    .menu {
        position: absolute;
        right: 70px;
        font-weight: 500;
        display: flex;
        gap: 40px;
        align-items: center;

        a, img {
            cursor: pointer;
        } 
        
        a:hover {
            color: var(--green);
        }

        #user-icon {
            width: 30px;
            height: 30px;
        }
    }

    .user-menu {
        position: fixed;
        display: flex;
        flex-direction: column;
        gap: 20px;
        right: 25px;
        padding: 16px;
        border-radius: 8px;
        font-size: .9rem;
        background: var(--dialogue-bg-color);
        z-index: 100;
        span:hover {
            cursor: pointer;
            color: var(--green)
        }

        a:hover {
            cursor: pointer;
            color: var(--green)
        }
    }
`

export default GlobalStyle;