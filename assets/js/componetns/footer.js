let footer = document.querySelector('footer')
if (footer) {

    footer.innerHTML =
        `
        <div class="footer-main">
            <div class="payment_methods">
                <h3>Способы оплаты</h3>
                <img src="./images/credit-card.png" alt="">
                <img src="./images/visa.png" alt="">
                <img src="./images/master card.png" alt="">
                <img src="./images/sbp_card.png" alt="">
                <img src="./images/оборудование.png" alt="">
                <img src="./images/youmany-card.webp" alt="">
            </div>
            <div class="footer-main-info">
                <h3>Информация</h3>
                <p>Условия продажи</p>
                <p>Политика конфиденциальности</p>
                <p>Пользовательское соглашение</p>
            </div>
            <div class="btn-footer">
                <button class="btn_footer"><a href="https://t.me/NewPayTelegramBot" target="_blank">Write to support</a></button>
            </div>
        </div>
        <hr class="main_support_hr">
        <div class="footer_bottom">
            <div class="info_footer">
                <p>© 20204–2025 NewPay</p>
                <a href="">Политика конфиденциальности</a><br>
                <a href="">Политика cookie</a>
                <a href="">Отправить запрос</a>
            </div>
            <div class="footer-image">
                <img src="./images/telegram-img.png" alt="">
                <img src="./images/YouTube-img.webp" alt="">
                <img src="./images/VK - img.png" alt="">
            </div>
        </div>
        `
}