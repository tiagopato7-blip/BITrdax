/* --------------------------------------------------
   BEYOND AI - INTERATIVIDADE & GATILHOS DE FOMO
   -------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. MENU MOBILE
    // ==========================================
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const closeMenuBtn = document.getElementById("close-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileLinks = document.querySelectorAll(".mobile-link");

    const toggleMenu = () => {
        mobileMenu.classList.toggle("open");
    };

    if (mobileMenuBtn) mobileMenuBtn.addEventListener("click", toggleMenu);
    if (closeMenuBtn) closeMenuBtn.addEventListener("click", toggleMenu);
    
    mobileLinks.forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("open");
        });
    });


    // ==========================================
    // 2. TEMPORIZADOR DE ESCASSEZ (COUNTDOWN 10 HORAS)
    // ==========================================
    let totalSeconds = 10 * 3600; // 10 horas
    const miniTimer = document.getElementById("mini-timer"); // Fomo bar no header
    const timerHour = document.getElementById("timer-hour");
    const timerMin10h = document.getElementById("timer-min-10h");
    const timerSec10h = document.getElementById("timer-sec-10h");

    const updateCountdown = () => {
        let hours = Math.floor(totalSeconds / 3600);
        let minutes = Math.floor((totalSeconds % 3600) / 60);
        let seconds = totalSeconds % 60;

        // Formatação
        let formattedHour = hours < 10 ? "0" + hours : hours;
        let formattedMin = minutes < 10 ? "0" + minutes : minutes;
        let formattedSec = seconds < 10 ? "0" + seconds : seconds;

        // Atualiza a Fomo Bar (se existir, mostrando apenas min:sec ou hour:min)
        if (miniTimer) miniTimer.innerText = `${formattedHour}:${formattedMin}:${formattedSec}`;
        
        // Atualiza o Widget de Cadastro Gratuito de 10h
        if (timerHour) timerHour.innerText = formattedHour;
        if (timerMin10h) timerMin10h.innerText = formattedMin;
        if (timerSec10h) timerSec10h.innerText = formattedSec;

        if (totalSeconds <= 0) {
            totalSeconds = 10 * 3600; // Reseta se chegar a 0
        } else {
            totalSeconds--;
        }
    };

    setInterval(updateCountdown, 1000);
    updateCountdown();


    // ==========================================
    // 3. CONTADOR DE VAGAS DINÂMICO
    // ==========================================
    let currentVagas = 12;
    const vagasCountElement = document.getElementById("vagas-count");
    const scarcityCountElement = document.getElementById("scarcity-count");
    const progressBarFill = document.getElementById("progress-bar-fill");

    const updateVagasProgress = () => {
        if (vagasCountElement) vagasCountElement.innerText = currentVagas;
        if (scarcityCountElement) scarcityCountElement.innerText = currentVagas;
        
        // Calcula a porcentagem do progresso (250 vagas totais)
        // 238 vagas preenchidas, sobram de 12 para baixo
        let percentRemaining = (currentVagas / 250) * 100;
        if (progressBarFill) {
            progressBarFill.style.width = `${percentRemaining * 12}%`; // Escala visual para preencher bem
        }
    };

    // Simulação de venda de licenças com flutuação de FOMO
    const simulateLicenseSales = () => {
        const chance = Math.random();
        if (chance > 0.65 && currentVagas > 3) {
            // Vendeu uma vaga
            currentVagas--;
            updateVagasProgress();
        } else if (chance < 0.05 && currentVagas < 14) {
            // Cancelou ou liberou vaga
            currentVagas++;
            updateVagasProgress();
        }
    };

    setInterval(simulateLicenseSales, 18000); // Checa a cada 18 segundos
    updateVagasProgress();


    // ==========================================
    // 4. TICKER DE PREÇOS (RIBON INFERIOR DO HERO)
    // ==========================================
    const tickerWrapper = document.getElementById("ticker-wrapper");
    const coins = [
        { name: "BTC", price: 68420.50, change: 2.45, iconHtml: '<img src="https://cryptologos.cc/logos/bitcoin-btc-logo.svg" width="20" height="20" style="vertical-align: middle; margin-right: 5px;">' },
        { name: "ETH", price: 3482.10, change: 3.12, iconHtml: '<img src="https://cryptologos.cc/logos/ethereum-eth-logo.svg" width="20" height="20" style="vertical-align: middle; margin-right: 5px;">' },
        { name: "SOL", price: 178.45, change: 8.94, iconHtml: '<img src="https://cryptologos.cc/logos/solana-sol-logo.svg" width="20" height="20" style="vertical-align: middle; margin-right: 5px;">' },
        { name: "BNB", price: 582.30, change: 1.15, iconHtml: '<img src="https://cryptologos.cc/logos/bnb-bnb-logo.svg" width="20" height="20" style="vertical-align: middle; margin-right: 5px;">' },
        { name: "ADA", price: 0.485, change: 0.64, iconHtml: '<img src="https://cryptologos.cc/logos/cardano-ada-logo.svg" width="20" height="20" style="vertical-align: middle; margin-right: 5px;">' },
        { name: "DOT", price: 6.95, change: 2.88, iconHtml: '<img src="https://cryptologos.cc/logos/polkadot-new-dot-logo.svg" width="20" height="20" style="vertical-align: middle; margin-right: 5px;">' },
        { name: "LINK", price: 16.42, change: 4.50, iconHtml: '<img src="https://cryptologos.cc/logos/chainlink-link-logo.svg" width="20" height="20" style="vertical-align: middle; margin-right: 5px;">' }
    ];

    const generateTickerContent = () => {
        if (!tickerWrapper) return;
        
        let contentHtml = "";
        // Duplicamos a lista para criar um efeito seamless infinito
        const doubledCoins = [...coins, ...coins, ...coins];
        
        doubledCoins.forEach(coin => {
            const isUp = coin.change >= 0;
            const sign = isUp ? "+" : "";
            const colorClass = isUp ? "price-up" : "price-down";
            const caret = isUp ? '<i class="fa-solid fa-caret-up"></i>' : '<i class="fa-solid fa-caret-down"></i>';
            
            contentHtml += `
                <div class="ticker-item">
                    <span class="coin-name">${coin.iconHtml} ${coin.name}/USDT</span>
                    <span class="coin-price">$${coin.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                    <span class="coin-change ${colorClass}">${sign}${coin.change}% ${caret}</span>
                </div>
            `;
        });
        
        tickerWrapper.innerHTML = contentHtml;
    };

    generateTickerContent();


    // ==========================================
    // 5. CALCULADORA DE LUCROS INTERATIVA
    // ==========================================
    const slider = document.getElementById("investment-slider");
    const displayVal = document.getElementById("investment-display");
    const monthlyVal = document.getElementById("result-monthly");
    const annualVal = document.getElementById("result-annual");
    const roiLabel = document.querySelector(".roi-label");

    const updateCalculatorResults = () => {
        if (!slider) return;
        const val = parseInt(slider.value);
        
        // Atualiza a label do slider
        if (displayVal) {
            displayVal.innerText = `€ ${val.toLocaleString("pt-BR")}`;
        }

        // 15% de lucro estimado ao mês
        const monthlyProfit = val * 0.15;
        // 180% de lucro ao ano
        const annualProfit = val * 1.80;

        // Atualiza os valores projetados
        if (monthlyVal) {
            monthlyVal.innerText = `€ ${monthlyProfit.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        }
        if (annualVal) {
            annualVal.innerText = `€ ${(val + annualProfit).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        }

        if (roiLabel) {
            roiLabel.innerHTML = `Seu Dinheiro Multiplicado por <span class="highlight-gold">2.8x</span>`;
        }
    };

    if (slider) {
        slider.addEventListener("input", updateCalculatorResults);
        updateCalculatorResults();
    }


    // ==========================================
    // 6. SIMULAÇÃO DE TRADES (REMOVIDO: Dashboard substituído pelo Diagrama)
    // ==========================================


    // ==========================================
    // 7. ACORDEÃO DO FAQ (DÚVIDAS FREQUENTES)
    // ==========================================
    const faqTriggers = document.querySelectorAll(".faq-trigger");

    faqTriggers.forEach(trigger => {
        trigger.addEventListener("click", () => {
            const parent = trigger.parentElement;
            const content = trigger.nextElementSibling;
            const isOpen = parent.classList.contains("open");

            // Fecha todos os outros primeiro
            document.querySelectorAll(".faq-item").forEach(item => {
                item.classList.remove("open");
                item.querySelector(".faq-content").style.maxHeight = null;
            });

            // Se não estava aberto, abre o atual
            if (!isOpen) {
                parent.classList.add("open");
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });


    // ==========================================
    // 8. FORMULÁRIO DE CADASTRO (REMOVIDO: Substituído por Link Direto)
    // ==========================================

    // ==========================================
    // 9. SCROLL ANIMATION FOR HERO AI CHART
    // ==========================================
    const heroChartLine = document.querySelector(".hero-chart-line");
    const heroChartFill = document.querySelector(".hero-chart-fill");
    const heroChartDots = document.querySelectorAll(".hero-chart-dot");

    if (heroChartLine) {
        // Initial setup
        const pathLength = heroChartLine.getTotalLength();
        heroChartLine.style.strokeDasharray = pathLength;
        heroChartLine.style.strokeDashoffset = pathLength;

        // Animate based on scroll
        window.addEventListener("scroll", () => {
            const scrollY = window.scrollY;
            const scrollMax = 500; // Animate over the first 500px of scroll
            
            let scrollPercent = Math.min(scrollY / scrollMax, 1);
            
            // Base visibility 30%, remaining 70% based on scroll
            let basePercent = 0.3;
            let totalPercent = basePercent + (scrollPercent * (1 - basePercent));
            
            // Draw the line
            const drawLength = pathLength * totalPercent;
            heroChartLine.style.strokeDashoffset = pathLength - drawLength;
            
            // Fade in the fill
            if (heroChartFill) {
                heroChartFill.style.opacity = totalPercent * 0.5;
            }
            
            // Show dots based on progress
            heroChartDots.forEach((dot, index) => {
                const threshold = (index + 1) * 0.25;
                if (totalPercent >= threshold) {
                    dot.style.opacity = "1";
                    dot.style.transform = "scale(1)";
                } else {
                    dot.style.opacity = "0";
                    dot.style.transform = "scale(0)";
                }
            });
        });

        // Trigger once on load
        window.dispatchEvent(new Event('scroll'));
    }

});

// ==========================================
// 10. LIGHTBOX (GALERIA DE IMAGENS)
// ==========================================
window.openLightbox = function(src) {
    const modal = document.getElementById('lightbox-modal');
    const modalImg = document.getElementById('lightbox-img');
    if (modal && modalImg) {
        modal.style.display = "block";
        modalImg.src = src;
    }
};

window.closeLightbox = function() {
    const modal = document.getElementById('lightbox-modal');
    if (modal) {
        modal.style.display = "none";
    }
};
