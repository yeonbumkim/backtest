// Investment Backtesting Simulator
// Historical data and calculation logic

class InvestmentSimulator {
    constructor() {
        this.initializeData();
        this.setupEventListeners();
        this.populateSelectors();
        this.displayStockInfo();
        this.populateHistoricalData();
        this.currentChart = null;
    }

    // Historical KRW-USD exchange rates (annual averages)
    initializeData() {
        this.exchangeRates = {
            1994: 803.45,
            1995: 771.27,
            1996: 804.45,
            1997: 951.29,
            1998: 1401.44, // Asian Financial Crisis
            1999: 1188.82,
            2000: 1130.96,
            2001: 1290.99,
            2002: 1251.09,
            2003: 1191.61,
            2004: 1145.32,
            2005: 1024.12,
            2006: 954.79,
            2007: 929.26,
            2008: 1102.62, // Global Financial Crisis
            2009: 1276.93,
            2010: 1156.06,
            2011: 1108.29,
            2012: 1126.47,
            2013: 1095.04,
            2014: 1052.96,
            2015: 1131.49,
            2016: 1160.50,
            2017: 1130.84,
            2018: 1100.19,
            2019: 1165.65,
            2020: 1180.27, // COVID-19
            2021: 1144.36,
            2022: 1291.95,
            2023: 1305.41,
            2024: 1320.00 // Estimated
        };

        // Top 10 US stocks with historical prices (split-adjusted annual averages)
        this.stockData = {
            'AAPL': {
                name: 'Apple Inc.',
                description: 'Consumer electronics and software company',
                sector: 'Technology',
                prices: {
                    1994: 0.89, 1995: 1.19, 1996: 1.14, 1997: 0.91, 1998: 1.41,
                    1999: 2.94, 2000: 3.71, 2001: 1.11, 2002: 1.16, 2003: 1.16,
                    2004: 2.30, 2005: 5.39, 2006: 7.55, 2007: 14.54, 2008: 12.37,
                    2009: 15.95, 2010: 27.44, 2011: 35.31, 2012: 72.80, 2013: 71.04,
                    2014: 93.99, 2015: 105.26, 2016: 104.19, 2017: 140.22, 2018: 169.23,
                    2019: 187.44, 2020: 108.77, 2021: 142.92, 2022: 159.69, 2023: 189.69, 2024: 225.00
                }
            },
            'MSFT': {
                name: 'Microsoft Corporation',
                description: 'Software and cloud computing giant',
                sector: 'Technology',
                prices: {
                    1994: 1.69, 1995: 2.16, 1996: 4.24, 1997: 8.78, 1998: 15.06,
                    1999: 42.75, 2000: 53.19, 2001: 33.00, 2002: 26.75, 2003: 27.85,
                    2004: 27.85, 2005: 26.75, 2006: 28.18, 2007: 32.60, 2008: 19.44,
                    2009: 24.99, 2010: 28.05, 2011: 25.96, 2012: 28.18, 2013: 32.39,
                    2014: 41.99, 2015: 51.78, 2016: 59.20, 2017: 74.42, 2018: 101.57,
                    2019: 108.36, 2020: 201.12, 2021: 284.91, 2022: 309.42, 2023: 344.73, 2024: 415.00
                }
            },
            'AMZN': {
                name: 'Amazon.com Inc.',
                description: 'E-commerce and cloud services leader',
                sector: 'Consumer Discretionary',
                prices: {
                    1997: 1.96, 1998: 7.47, 1999: 76.13, 2000: 40.75, 2001: 10.82,
                    2002: 18.89, 2003: 39.95, 2004: 43.20, 2005: 39.46, 2006: 38.09,
                    2007: 77.82, 2008: 51.28, 2009: 118.81, 2010: 125.41, 2011: 194.44,
                    2012: 244.37, 2013: 364.53, 2014: 309.84, 2015: 675.89, 2016: 844.36,
                    2017: 1169.47, 2018: 1784.51, 2019: 1848.86, 2020: 3201.22, 2021: 3372.20,
                    2022: 146.57, 2023: 144.05, 2024: 185.00
                }
            },
            'GOOGL': {
                name: 'Alphabet Inc. (Google)',
                description: 'Internet search and advertising giant',
                sector: 'Technology',
                prices: {
                    2004: 50.22, 2005: 206.43, 2006: 232.83, 2007: 269.94, 2008: 154.68,
                    2009: 307.65, 2010: 285.04, 2011: 301.80, 2012: 358.16, 2013: 559.76,
                    2014: 579.04, 2015: 773.88, 2016: 808.01, 2017: 972.60, 2018: 1086.20,
                    2019: 1337.02, 2020: 1751.88, 2021: 2891.84, 2022: 2240.04, 2023: 138.21, 2024: 162.50
                }
            },
            'TSLA': {
                name: 'Tesla Inc.',
                description: 'Electric vehicle and clean energy company',
                sector: 'Consumer Discretionary',
                prices: {
                    2010: 4.06, 2011: 5.74, 2012: 7.25, 2013: 30.52, 2014: 44.81,
                    2015: 44.65, 2016: 41.59, 2017: 66.36, 2018: 66.56, 2019: 55.27,
                    2020: 149.01, 2021: 352.76, 2022: 302.61, 2023: 248.48, 2024: 250.00
                }
            },
            'NVDA': {
                name: 'NVIDIA Corporation',
                description: 'Semiconductor and AI computing leader',
                sector: 'Technology',
                prices: {
                    1999: 1.31, 2000: 3.47, 2001: 2.22, 2002: 1.03, 2003: 1.29,
                    2004: 1.86, 2005: 3.08, 2006: 3.71, 2007: 3.21, 2008: 1.02,
                    2009: 1.46, 2010: 1.59, 2011: 1.59, 2012: 1.32, 2013: 1.59,
                    2014: 1.94, 2015: 3.22, 2016: 5.39, 2017: 19.48, 2018: 13.75,
                    2019: 36.48, 2020: 126.18, 2021: 246.80, 2022: 160.26, 2023: 440.17, 2024: 130.00
                }
            },
            'BRK.A': {
                name: 'Berkshire Hathaway Inc.',
                description: 'Warren Buffett\'s investment conglomerate',
                sector: 'Financial Services',
                prices: {
                    1994: 20000, 1995: 23000, 1996: 34100, 1997: 46000, 1998: 70900,
                    1999: 56100, 2000: 71000, 2001: 71005, 2002: 71900, 2003: 84500,
                    2004: 87300, 2005: 88400, 2006: 109990, 2007: 141600, 2008: 84250,
                    2009: 99200, 2010: 120150, 2011: 116050, 2012: 131775, 2013: 174190,
                    2014: 218346, 2015: 213750, 2016: 247998, 2017: 296915, 2018: 312290,
                    2019: 340690, 2020: 347275, 2021: 421690, 2022: 451345, 2023: 538135, 2024: 650000
                }
            },
            'JNJ': {
                name: 'Johnson & Johnson',
                description: 'Healthcare and pharmaceutical company',
                sector: 'Healthcare',
                prices: {
                    1994: 14.67, 1995: 18.38, 1996: 22.50, 1997: 29.44, 1998: 37.69,
                    1999: 45.06, 2000: 52.31, 2001: 59.94, 2002: 53.08, 2003: 51.66,
                    2004: 59.77, 2005: 59.86, 2006: 66.02, 2007: 67.38, 2008: 58.56,
                    2009: 62.16, 2010: 61.85, 2011: 65.58, 2012: 72.73, 2013: 95.80,
                    2014: 101.00, 2015: 102.72, 2016: 115.48, 2017: 139.72, 2018: 140.48,
                    2019: 145.87, 2020: 148.31, 2021: 161.91, 2022: 177.49, 2023: 160.13, 2024: 152.00
                }
            },
            'V': {
                name: 'Visa Inc.',
                description: 'Payment processing and financial services',
                sector: 'Financial Services',
                prices: {
                    2008: 44.57, 2009: 24.68, 2010: 28.42, 2011: 29.25, 2012: 32.53,
                    2013: 49.23, 2014: 54.18, 2015: 75.16, 2016: 78.02, 2017: 99.36,
                    2018: 138.07, 2019: 177.21, 2020: 210.16, 2021: 236.47, 2022: 208.01,
                    2023: 244.36, 2024: 285.00
                }
            },
            'WMT': {
                name: 'Walmart Inc.',
                description: 'Retail and e-commerce giant',
                sector: 'Consumer Staples',
                prices: {
                    1994: 10.83, 1995: 11.25, 1996: 11.50, 1997: 17.44, 1998: 27.69,
                    1999: 34.75, 2000: 53.13, 2001: 57.00, 2002: 54.06, 2003: 59.25,
                    2004: 53.99, 2005: 47.15, 2006: 45.82, 2007: 50.87, 2008: 56.64,
                    2009: 51.36, 2010: 53.50, 2011: 57.24, 2012: 69.50, 2013: 81.37,
                    2014: 85.25, 2015: 68.17, 2016: 71.04, 2017: 97.58, 2018: 109.25,
                    2019: 112.25, 2020: 144.69, 2021: 139.87, 2022: 138.34, 2023: 159.13, 2024: 85.50
                }
            },
            'SPY': {
                name: 'SPDR S&P 500 ETF',
                description: 'Tracks the S&P 500 index',
                sector: 'ETF',
                prices: {
                    1993: 44.30, 1994: 45.50, 1995: 61.10, 1996: 70.40, 1997: 94.40,
                    1998: 103.00, 1999: 140.50, 2000: 132.00, 2001: 102.10, 2002: 87.90,
                    2003: 111.20, 2004: 121.50, 2005: 125.40, 2006: 142.30, 2007: 147.90,
                    2008: 90.30, 2009: 113.30, 2010: 125.75, 2011: 125.50, 2012: 142.40,
                    2013: 184.70, 2014: 205.50, 2015: 203.87, 2016: 223.53, 2017: 267.83,
                    2018: 249.92, 2019: 321.86, 2020: 373.88, 2021: 466.48, 2022: 377.91, 
                    2023: 446.65, 2024: 565.00
                }
            },
            'QQQ': {
                name: 'Invesco QQQ ETF',
                description: 'Tracks the Nasdaq-100 index',
                sector: 'ETF',
                prices: {
                    1999: 103.87, 2000: 85.19, 2001: 38.01, 2002: 24.60, 2003: 36.11,
                    2004: 39.05, 2005: 42.10, 2006: 46.10, 2007: 52.30, 2008: 27.51,
                    2009: 43.78, 2010: 54.15, 2011: 57.86, 2012: 66.59, 2013: 88.35,
                    2014: 107.41, 2015: 108.32, 2016: 119.72, 2017: 151.10, 2018: 165.84,
                    2019: 208.51, 2020: 313.74, 2021: 408.71, 2022: 263.07, 2023: 391.84, 
                    2024: 495.00
                }
            },
            'SCHD': {
                name: 'Schwab US Dividend Equity ETF',
                description: 'High dividend yield US stocks',
                sector: 'ETF',
                prices: {
                    2011: 26.82, 2012: 32.45, 2013: 41.25, 2014: 46.85, 2015: 47.20,
                    2016: 53.45, 2017: 58.90, 2018: 53.25, 2019: 63.45, 2020: 62.30,
                    2021: 79.56, 2022: 74.25, 2023: 77.45, 2024: 81.50
                }
            },
            'VTI': {
                name: 'Vanguard Total Stock Market ETF',
                description: 'Total US stock market index',
                sector: 'ETF',
                prices: {
                    2001: 57.48, 2002: 49.47, 2003: 62.50, 2004: 68.54, 2005: 71.89,
                    2006: 80.92, 2007: 82.80, 2008: 50.45, 2009: 63.82, 2010: 70.45,
                    2011: 70.12, 2012: 78.45, 2013: 102.87, 2014: 114.56, 2015: 113.89,
                    2016: 124.78, 2017: 149.34, 2018: 139.12, 2019: 179.45, 2020: 207.12,
                    2021: 244.06, 2022: 198.87, 2023: 234.67, 2024: 292.00
                }
            },
            'VEA': {
                name: 'Vanguard FTSE Developed Markets ETF',
                description: 'International developed markets',
                sector: 'ETF',
                prices: {
                    2007: 52.30, 2008: 29.45, 2009: 34.78, 2010: 37.90, 2011: 34.67,
                    2012: 37.45, 2013: 42.30, 2014: 40.56, 2015: 36.78, 2016: 38.90,
                    2017: 45.23, 2018: 41.67, 2019: 46.78, 2020: 44.56, 2021: 51.89,
                    2022: 43.45, 2023: 47.89, 2024: 50.25
                }
            }
        };

        this.currentExchangeRate = 1320.00; // Current estimated KRW/USD rate
        this.currentYear = 2024;
    }

    setupEventListeners() {
        const calculateBtn = document.getElementById('calculateBtn');
        const currencyToggle = document.getElementById('currencyToggle');
        const tabBtns = document.querySelectorAll('.tab-btn');
        const stockDataSelect = document.getElementById('stockDataSelect');

        calculateBtn.addEventListener('click', () => this.calculateInvestment());
        currencyToggle.addEventListener('change', () => this.toggleCurrency());
        
        tabBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });

        stockDataSelect.addEventListener('change', (e) => this.displayStockData(e.target.value));
    }

    populateSelectors() {
        const yearSelect = document.getElementById('investmentYear');
        const stockSelect = document.getElementById('stockSelect');
        const stockDataSelect = document.getElementById('stockDataSelect');

        // Populate year options
        for (let year = 1994; year <= 2023; year++) {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year + '년';
            yearSelect.appendChild(option);
        }

        // Populate stock options
        Object.keys(this.stockData).forEach(symbol => {
            const stock = this.stockData[symbol];
            const option1 = document.createElement('option');
            option1.value = symbol;
            option1.textContent = `${symbol} - ${stock.name}`;
            stockSelect.appendChild(option1);

            const option2 = document.createElement('option');
            option2.value = symbol;
            option2.textContent = `${symbol} - ${stock.name}`;
            stockDataSelect.appendChild(option2);
        });
    }

    toggleCurrency() {
        const currencyToggle = document.getElementById('currencyToggle');
        const amountInput = document.getElementById('investmentAmount');
        
        if (currencyToggle.checked) {
            amountInput.placeholder = "1,000 USD";
        } else {
            amountInput.placeholder = "1,000,000 KRW";
        }
    }

    calculateInvestment() {
        const year = parseInt(document.getElementById('investmentYear').value);
        const amount = parseFloat(document.getElementById('investmentAmount').value);
        const stockSymbol = document.getElementById('stockSelect').value;
        const isUSD = document.getElementById('currencyToggle').checked;

        if (!year || !amount || !stockSymbol) {
            alert('모든 필드를 입력해주세요!');
            return;
        }

        const stock = this.stockData[stockSymbol];
        if (!stock || !stock.prices[year]) {
            alert('선택한 연도에 해당하는 데이터가 없습니다.');
            return;
        }

        this.showLoading();

        setTimeout(() => {
            const results = this.performCalculation(year, amount, stockSymbol, isUSD);
            this.displayResults(results);
            this.createChart(results.chartData);
            this.generateFunFacts(results);
            this.hideLoading();
        }, 1500);
    }

    performCalculation(year, amount, stockSymbol, isUSD) {
        const stock = this.stockData[stockSymbol];
        const initialExchangeRate = this.exchangeRates[year];
        const currentExchangeRate = this.currentExchangeRate;
        const initialStockPrice = stock.prices[year];
        const currentStockPrice = stock.prices[this.currentYear] || stock.prices[2024];

        // Convert investment amount to USD
        let investmentUSD;
        let investmentKRW;
        
        if (isUSD) {
            investmentUSD = amount;
            investmentKRW = amount * initialExchangeRate;
        } else {
            investmentKRW = amount;
            investmentUSD = amount / initialExchangeRate;
        }

        // Calculate number of shares
        const shares = investmentUSD / initialStockPrice;
        
        // Calculate current value
        const currentValueUSD = shares * currentStockPrice;
        const currentValueKRW = currentValueUSD * currentExchangeRate;
        
        // Calculate returns
        const totalReturnPercent = ((currentValueKRW - investmentKRW) / investmentKRW) * 100;
        const totalGainKRW = currentValueKRW - investmentKRW;
        const yearsInvested = this.currentYear - year;
        const annualReturnPercent = Math.pow(currentValueKRW / investmentKRW, 1 / yearsInvested) - 1;

        // Generate chart data
        const chartData = this.generateChartData(year, investmentKRW, stockSymbol, shares);

        return {
            initialInvestmentKRW: investmentKRW,
            initialInvestmentUSD: investmentUSD,
            currentValueKRW: currentValueKRW,
            currentValueUSD: currentValueUSD,
            totalReturnPercent: totalReturnPercent,
            totalGainKRW: totalGainKRW,
            annualReturnPercent: annualReturnPercent * 100,
            shares: shares,
            initialExchangeRate: initialExchangeRate,
            currentExchangeRate: currentExchangeRate,
            exchangeChangePercent: ((currentExchangeRate - initialExchangeRate) / initialExchangeRate) * 100,
            stockSymbol: stockSymbol,
            stockName: stock.name,
            yearsInvested: yearsInvested,
            chartData: chartData
        };
    }

    generateChartData(startYear, initialInvestmentKRW, stockSymbol, shares) {
        const stock = this.stockData[stockSymbol];
        const labels = [];
        const data = [];

        for (let year = startYear; year <= this.currentYear; year++) {
            if (stock.prices[year] && this.exchangeRates[year]) {
                labels.push(year);
                const stockPriceUSD = stock.prices[year];
                const exchangeRate = this.exchangeRates[year];
                const valueKRW = shares * stockPriceUSD * exchangeRate;
                data.push(Math.round(valueKRW));
            }
        }

        return { labels, data };
    }

    displayResults(results) {
        document.getElementById('resultsSection').style.display = 'block';
        
        // Format numbers with commas and currency symbols
        document.getElementById('currentValue').textContent = 
            `₩${this.formatNumber(Math.round(results.currentValueKRW))}`;
        
        document.getElementById('totalReturn').textContent = 
            `${results.totalReturnPercent >= 0 ? '+' : ''}${results.totalReturnPercent.toFixed(2)}%`;
        
        document.getElementById('totalGain').textContent = 
            `₩${this.formatNumber(Math.round(results.totalGainKRW))}`;
        
        document.getElementById('annualReturn').textContent = 
            `${results.annualReturnPercent >= 0 ? '+' : ''}${results.annualReturnPercent.toFixed(2)}%`;

        // Exchange rate information
        document.getElementById('initialExchange').textContent = 
            `₩${this.formatNumber(results.initialExchangeRate)}`;
        
        document.getElementById('currentExchange').textContent = 
            `₩${this.formatNumber(results.currentExchangeRate)}`;
        
        document.getElementById('exchangeChange').textContent = 
            `${results.exchangeChangePercent >= 0 ? '+' : ''}${results.exchangeChangePercent.toFixed(2)}%`;

        // Add color coding for positive/negative values
        this.applyColorCoding('totalReturn', results.totalReturnPercent);
        this.applyColorCoding('totalGain', results.totalGainKRW);
        this.applyColorCoding('annualReturn', results.annualReturnPercent);
        this.applyColorCoding('exchangeChange', results.exchangeChangePercent);

        // Scroll to results
        document.getElementById('resultsSection').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }

    applyColorCoding(elementId, value) {
        const element = document.getElementById(elementId);
        element.classList.remove('positive', 'negative');
        
        if (value > 0) {
            element.classList.add('positive');
        } else if (value < 0) {
            element.classList.add('negative');
        }
    }

    createChart(chartData) {
        const ctx = document.getElementById('investmentChart').getContext('2d');
        
        if (this.currentChart) {
            this.currentChart.destroy();
        }

        this.currentChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: chartData.labels,
                datasets: [{
                    label: '투자 가치 (KRW)',
                    data: chartData.data,
                    borderColor: 'rgb(102, 126, 234)',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: 'rgb(102, 126, 234)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 5,
                    pointHoverRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function(context) {
                                return `투자 가치: ₩${context.parsed.y.toLocaleString()}`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: '연도'
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: '가치 (KRW)'
                        },
                        ticks: {
                            callback: function(value) {
                                return '₩' + value.toLocaleString();
                            }
                        }
                    }
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                }
            }
        });
    }

    generateFunFacts(results) {
        const factsContainer = document.getElementById('funFacts');
        factsContainer.innerHTML = '';

        const facts = [
            `🎯 ${results.yearsInvested}년 동안 보유한 ${results.stockSymbol} 주식은 총 ${results.shares.toFixed(2)}주입니다.`,
            `💰 초기 투자금 ₩${this.formatNumber(Math.round(results.initialInvestmentKRW))}가 현재 ₩${this.formatNumber(Math.round(results.currentValueKRW))}가 되었습니다.`,
            `📈 이는 ${results.totalReturnPercent > 0 ? '무려 ' : ''}${Math.abs(results.totalReturnPercent).toFixed(1)}%의 ${results.totalReturnPercent > 0 ? '수익' : '손실'}을 의미합니다.`,
            `🌟 연평균 수익률이 ${Math.abs(results.annualReturnPercent).toFixed(1)}%였습니다.`,
            `💱 환율은 ${results.exchangeChangePercent.toFixed(1)}% 변동했습니다.`
        ];

        if (results.totalReturnPercent > 1000) {
            facts.push(`🚀 놀라운 결과입니다! 1000% 이상의 수익을 달성했네요!`);
        } else if (results.totalReturnPercent > 500) {
            facts.push(`🎉 대단한 투자였습니다! 5배 이상의 수익을 올렸네요!`);
        } else if (results.totalReturnPercent > 100) {
            facts.push(`👏 훌륭한 투자 선택이었습니다!`);
        }

        facts.forEach(fact => {
            const factElement = document.createElement('div');
            factElement.className = 'fact-item';
            factElement.textContent = fact;
            factsContainer.appendChild(factElement);
        });
    }

    displayStockInfo() {
        const stockGrid = document.getElementById('stockGrid');
        stockGrid.innerHTML = '';

        Object.keys(this.stockData).forEach(symbol => {
            const stock = this.stockData[symbol];
            const currentPrice = stock.prices[this.currentYear] || stock.prices[2024];
            const oldPrice = stock.prices[2000] || stock.prices[1999] || stock.prices[1998];
            const change = ((currentPrice - oldPrice) / oldPrice) * 100;

            const stockCard = document.createElement('div');
            stockCard.className = 'stock-card';
            stockCard.innerHTML = `
                <div class="stock-symbol">${symbol}</div>
                <div class="stock-name">${stock.name}</div>
                <div class="stock-info">
                    <div class="stock-metric">
                        <span class="label">현재 주가:</span>
                        <span class="value">$${currentPrice.toFixed(2)}</span>
                    </div>
                    <div class="stock-metric">
                        <span class="label">섹터:</span>
                        <span class="value">${stock.sector}</span>
                    </div>
                    <div class="stock-metric">
                        <span class="label">20년+ 수익률:</span>
                        <span class="value ${change > 0 ? 'positive' : 'negative'}">
                            ${change > 0 ? '+' : ''}${change.toFixed(1)}%
                        </span>
                    </div>
                </div>
            `;
            stockGrid.appendChild(stockCard);
        });
    }

    populateHistoricalData() {
        // Populate exchange rate table
        const exchangeTableBody = document.querySelector('#exchangeTable tbody');
        exchangeTableBody.innerHTML = '';

        Object.keys(this.exchangeRates).reverse().forEach((year, index) => {
            const rate = this.exchangeRates[year];
            const prevYear = parseInt(year) - 1;
            const prevRate = this.exchangeRates[prevYear];
            const change = prevRate ? ((rate - prevRate) / prevRate) * 100 : 0;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${year}</td>
                <td>₩${this.formatNumber(rate)}</td>
                <td class="${change > 0 ? 'negative' : 'positive'}">
                    ${prevRate ? (change > 0 ? '+' : '') + change.toFixed(2) + '%' : '-'}
                </td>
            `;
            exchangeTableBody.appendChild(row);
        });
    }

    displayStockData(symbol) {
        if (!symbol) {
            document.querySelector('#stockTable tbody').innerHTML = '';
            return;
        }

        const stock = this.stockData[symbol];
        const stockTableBody = document.querySelector('#stockTable tbody');
        stockTableBody.innerHTML = '';

        Object.keys(stock.prices).reverse().forEach(year => {
            const price = stock.prices[year];
            const prevYear = parseInt(year) - 1;
            const prevPrice = stock.prices[prevYear];
            const change = prevPrice ? ((price - prevPrice) / prevPrice) * 100 : 0;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${year}</td>
                <td>$${price.toFixed(2)}</td>
                <td class="${change > 0 ? 'positive' : 'negative'}">
                    ${prevPrice ? (change > 0 ? '+' : '') + change.toFixed(2) + '%' : '-'}
                </td>
                <td>조정됨</td>
            `;
            stockTableBody.appendChild(row);
        });
    }

    switchTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        document.getElementById(`${tabName}Tab`).classList.add('active');
    }

    showLoading() {
        document.getElementById('loadingOverlay').style.display = 'flex';
    }

    hideLoading() {
        document.getElementById('loadingOverlay').style.display = 'none';
    }

    formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new InvestmentSimulator();
});

// Add some fun animations and interactions
document.addEventListener('DOMContentLoaded', () => {
    // Add smooth scrolling to all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add click effect to buttons
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Add entrance animations to cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards for animation
    document.querySelectorAll('.card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Add easter eggs and fun interactions
document.addEventListener('keydown', (e) => {
    // Konami code easter egg
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    if (!window.konamiIndex) window.konamiIndex = 0;
    
    if (e.keyCode === konamiCode[window.konamiIndex]) {
        window.konamiIndex++;
        if (window.konamiIndex === konamiCode.length) {
            // Easter egg activated!
            document.body.style.animation = 'rainbow 2s infinite';
            setTimeout(() => {
                document.body.style.animation = '';
                alert('🎉 축하합니다! 히든 이스터에그를 발견했습니다! 🚀💰');
            }, 2000);
            window.konamiIndex = 0;
        }
    } else {
        window.konamiIndex = 0;
    }
});

// Add rainbow animation for easter egg
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);