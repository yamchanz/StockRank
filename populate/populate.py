import yfinance as yf
import mysql.connector
import csv
import math
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures
from currency_converter import CurrencyConverter
import datetime as dt
import pandas_datareader as pdr


def insertIntoUsers(login, password, name):
    try:
        connection = mysql.connector.connect(host='',
                                             database='Stocks',
                                             user='root',
                                             password='')
        cursor = connection.cursor()
        mySql_insert_query = """INSERT INTO Users (UserLogin, UserPassword, FirstName) 
                                VALUES (%s, %s, %s) """

        record = (login, password, name)
        cursor.execute(mySql_insert_query, record)
        connection.commit()
        print("Record inserted successfully into Users table")

    except mysql.connector.Error as error:
        print("Failed to insert into MySQL table {}".format(error))

    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL connection is closed")


def insertIntoRanking(tier, percentile, color):
    try:
        connection = mysql.connector.connect(host='',
                                             database='Stocks',
                                             user='root',
                                             password='')
        cursor = connection.cursor()
        mySql_insert_query = """INSERT INTO Ranking (Tier, Percentile, Color) 
                                VALUES (%s, %s, %s) """

        record = (tier, percentile, color)
        cursor.execute(mySql_insert_query, record)
        connection.commit()
        print("Record inserted successfully into Ranking table")

    except mysql.connector.Error as error:
        print("Failed to insert into MySQL table {}".format(error))

    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL connection is closed")


def insertIntoInsideOf(ticker, exchange):
    try:
        connection = mysql.connector.connect(host='',
                                             database='Stocks',
                                             user='root',
                                             password='')
        cursor = connection.cursor()
        mySql_insert_query = """INSERT INTO InsideOf (TickerSymbol, ExchangeName) 
                                VALUES (%s, %s) """

        record = (ticker, exchange)
        cursor.execute(mySql_insert_query, record)
        connection.commit()
        print("Record inserted successfully into InsideOf table")

    except mysql.connector.Error as error:
        print("Failed to insert into MySQL table {}".format(error))

    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL connection is closed")


def insertIntoExchange(exchange, location, timezone):
    try:
        connection = mysql.connector.connect(host='',
                                             database='Stocks',
                                             user='root',
                                             password='')
        cursor = connection.cursor()
        mySql_insert_query = """INSERT INTO Exchange (ExchangeName, ExchangeLocation, TimeZone) 
                                VALUES (%s, %s, %s) """

        record = (exchange, location, timezone)
        cursor.execute(mySql_insert_query, record)
        connection.commit()
        print("Record inserted successfully into Exchange table")

    except mysql.connector.Error as error:
        print("Failed to insert into MySQL table {}".format(error))

    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL connection is closed")


def insertIntoPrices(ticker, date, open, close, volume):
    try:
        connection = mysql.connector.connect(host='',
                                             database='Stocks',
                                             user='root',
                                             password='')
        cursor = connection.cursor()
        mySql_insert_query = """INSERT INTO Prices (TickerSymbol, PriceDate, OpenPrice, ClosePrice, Volume) 
                                VALUES (%s, %s, %s, %s, %s) """

        record = (ticker, date, open, close, volume)
        cursor.execute(mySql_insert_query, record)
        connection.commit()
        print("Record inserted successfully into Prices table")

    except mysql.connector.Error as error:
        print("Failed to insert into MySQL table {}".format(error))

    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL connection is closed")


def insertIntoCompany(company_id, company_name, sector, industry, country, market_cap, description, logo):
    try:
        connection = mysql.connector.connect(host='',
                                             database='Stocks',
                                             user='root',
                                             password='')
        cursor = connection.cursor()
        mySql_insert_query = """INSERT INTO Company (CompanyID, CompanyName, Sector, Industry, Country, MarketCap, CompanyDescription, Logo) 
                                VALUES (%s, %s, %s, %s, %s, %s, %s, %s) """

        record = (company_id, company_name, sector, industry, country, market_cap, description, logo)
        cursor.execute(mySql_insert_query, record)
        connection.commit()
        print("Record inserted successfully into Company table")

    except mysql.connector.Error as error:
        print("Failed to insert into MySQL table {}".format(error))

    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL connection is closed")


def updateIntoCompany(company_id, company_name, sector, industry, country, market_cap, description, logo):
    try:
        connection = mysql.connector.connect(host='',
                                             database='Stocks',
                                             user='root',
                                             password='')
        cursor = connection.cursor()
        mySql_update_query = """UPDATE Company
                                SET MarketCap = %s
                                WHERE CompanyID = %s """

        record = (market_cap, company_id)
        cursor.execute(mySql_update_query, record)
        connection.commit()
        print("Record updated successfully in Company table")

    except mysql.connector.Error as error:
        print("Failed to insert into MySQL table {}".format(error))

    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL connection is closed")


def insertIntoStocks(ticker, company_id, rank, revenue_growth, price_sales, gross_margins,
                     total_cash, total_debt, ebitda, recommendation_mean):
    try:
        connection = mysql.connector.connect(host='',
                                             database='Stocks',
                                             user='root',
                                             password='')
        cursor = connection.cursor()
        mySql_insert_query = """INSERT INTO Stocks (TickerSymbol, CompanyID, Tier, YoYRevenue, PS, GrossMargins, TotalCash, TotalDebt, EBITDA, RecommendationMean)
                                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s) """

        record = (ticker, company_id, rank, revenue_growth, price_sales, gross_margins, total_cash, total_debt, ebitda,
                  recommendation_mean)
        cursor.execute(mySql_insert_query, record)
        connection.commit()
        print("Record inserted successfully into Stocks table")

    except mysql.connector.Error as error:
        print("Failed to insert into MySQL table {}".format(error))

    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL connection is closed")


def updateIntoStocks(ticker, company_id, rank, revenue_growth, price_sales, gross_margins,
                     total_cash, total_debt, ebitda, recommendation_mean):
    try:
        connection = mysql.connector.connect(host='',
                                             database='Stocks',
                                             user='root',
                                             password='')
        cursor = connection.cursor()
        mySql_update_query = """UPDATE Stocks
                                SET TickerSymbol = %s, Tier = %s, YoYRevenue = %s, PS = %s, GrossMargins = %s, TotalCash = %s, TotalDebt = %s, EBITDA = %s, RecommendationMean = %s
                                WHERE CompanyID = %s """

        record = (ticker, rank, revenue_growth, price_sales, gross_margins, total_cash, total_debt, ebitda,
                  recommendation_mean, company_id)
        cursor.execute(mySql_update_query, record)
        connection.commit()
        print("Record updated successfully in Stocks table")

    except mysql.connector.Error as error:
        print("Failed to insert into MySQL table {}".format(error))

    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL connection is closed")


def insertRanks():
    insertIntoRanking('SS', 90, 'Red')
    insertIntoRanking('S+', 87, 'Orange')
    insertIntoRanking('S', 83, 'Orange')
    insertIntoRanking('S-', 80, 'Orange')
    insertIntoRanking('A+', 77, 'Yellow')
    insertIntoRanking('A', 73, 'Yellow')
    insertIntoRanking('A-', 70, 'Yellow')
    insertIntoRanking('B+', 67, 'Green')
    insertIntoRanking('B', 63, 'Green')
    insertIntoRanking('B-', 60, 'Green')
    insertIntoRanking('C+', 57, 'LightBlue')
    insertIntoRanking('C', 53, 'LightBlue')
    insertIntoRanking('C-', 50, 'LightBlue')
    insertIntoRanking('D+', 47, 'DarkBlue')
    insertIntoRanking('D', 43, 'DarkBlue')
    insertIntoRanking('D-', 40, 'DarkBlue')
    insertIntoRanking('E+', 37, 'Purple')
    insertIntoRanking('E', 33, 'Purple')
    insertIntoRanking('E-', 30, 'Purple')
    insertIntoRanking('F', 0, 'Brown')
    insertIntoRanking('NA', -1000, 'N/A')


def getEstimatedRevenueGrowth(rev, qrev, yoy_growth):
    # calculate linear regression estimate and r-squared
    x = np.array([1, 2, 3, 4]).reshape(-1, 1)
    y = qrev.to_numpy()
    lin = LinearRegression()
    lin.fit(x, y)
    lin_score = lin.score(x, y)
    lin_revenue_est = lin.predict(np.array([5]).reshape(1, -1))[0, 0]

    # calculate quadratic regression estimate and r-squared
    poly = PolynomialFeatures(degree=2)
    x_poly = poly.fit_transform(x)
    poly.fit(x_poly, y)
    lin2 = LinearRegression()
    lin2.fit(x_poly, y)
    poly_score = lin2.score(x_poly, y)
    poly_revenue_est = lin2.predict(poly.fit_transform(np.array([1, 2, 3, 4, 5]).reshape(-1, 1))[4].reshape(1, -1))[0, 0]

    # use revenue estimate of higher scoring model
    qrev_growth = poly_revenue_est / qrev[0, 0] - 1 if lin_score < poly_score else lin_revenue_est / qrev[0, 0] - 1
    avg_revenue_growth = (rev[3, 0] / rev[2, 0] - 1 + rev[2, 0] / rev[1, 0] - 1 + rev[1, 0] / rev[0, 0] - 1) / 3

    # if quarterly data not showing clear pattern, cannot rely on it
    if max(lin_score, poly_score) > 0.8:
        predicted_growth = (avg_revenue_growth + qrev_growth + yoy_growth) / 3
    else:
        predicted_growth = (1.5 * avg_revenue_growth + 0.5 * yoy_growth) / 2

    return predicted_growth


def getRank(stock, yoy_revenue_growth, ps, margins, cash, debt, ebitda, rec):
    rank: str = 'NA'

    # no revenue information, not able to give rank
    if 'Total Revenue' not in stock.financials.index:
        return rank

    annual_revenue = stock.financials.loc['Total Revenue', ].array[::-1].reshape(-1, 1)
    quarterly_revenue = stock.quarterly_financials.loc['Total Revenue', ].array[::-1].reshape(-1, 1)
    # if some revenue data missing, not able to give rank
    if annual_revenue.shape != (4, 1) or np.count_nonzero(annual_revenue) != 4:
        return rank
    predicted_growth = getEstimatedRevenueGrowth(annual_revenue, quarterly_revenue, yoy_revenue_growth)

    # if number of opinions too small, normalize recommendation rating. Otherwise if no
    if stock.info['numberOfAnalystOpinions'] is None:
        return rank
    elif stock.info['numberOfAnalystOpinions'] < 5:
        rec = (rec + 3) / 2

    grM = min(5, (1+predicted_growth)**3)
    # RS = (avg_revenue_growth - math.log(15 * ps / (100 * margins), 2) ** (1. / 3) + 1)*100
    RS = min(50, 50 * margins * 2**grM / ps)
    RR = (3 - rec) * 40
    score = RS + RR

    # add penalty for downward trending stocks
    low_growth_penalty = 745*predicted_growth - 58
    score += min(0, low_growth_penalty)

    # add penalty for low amounts of cash compared to debt
    cash_over_debt = cash / debt
    low_cash_penalty = 177*cash_over_debt - 105
    score += min(0, low_cash_penalty)

    # assign rank
    remainder = score
    if score >= 90:
        print(stock.info['symbol'], RS, RR, score, "SS", "*******************************")
        return 'SS'
    elif score >= 80:
        rank = 'S'; remainder -= 80
    elif score >= 70:
        rank = 'A'; remainder -= 70
    elif score >= 60:
        rank = 'B'; remainder -= 60
    elif score >= 50:
        rank = 'C'; remainder -= 50
    elif score >= 40:
        rank = 'D'; remainder -= 40
    elif score >= 30:
        rank = 'E'
    else:
        return 'F'

    if remainder >= 7:
        rank += '+'
    elif remainder < 3:
        rank += '-'

    if score > 80:
        print(stock.info['symbol'], RS, RR, score, rank, "--------------------------------")

    return rank


def getManualPS(stock, currency):
    c = CurrencyConverter()
    # not supported currency
    if currency == 'TWD' or currency == 'COP' or currency == 'PEN' or currency == 'CLP' or currency == 'ARS':
        return None
    # no revenue information, not able to calculate manual ps
    if 'Total Revenue' not in stock.quarterly_financials.index:
        return None
    quarterly_rev = stock.quarterly_financials.loc['Total Revenue',].array[::-1].reshape(-1, 1)
    # if some revenue data missing, not able to calculate manual ps
    if quarterly_rev.shape != (4, 1):
        return None
    foreign_rev = quarterly_rev[0, 0] + quarterly_rev[1, 0] + quarterly_rev[2, 0] + quarterly_rev[3, 0]
    usd_rev = c.convert(foreign_rev, currency, 'USD')
    market_cap = stock.info['marketCap']
    if usd_rev == 0 or market_cap is None:
        return None
    print("Changing P/S from", currency, "to USD")
    return market_cap / usd_rev


def getStockInfo(stock):
    revenue_growth = 0; ps = 0; margins = 0; cash = 0; debt = 0; ebitda = 0; rec = 0
    if 'zip' in stock.info:
        revenue_growth = stock.info['revenueGrowth']
        ps = stock.info['priceToSalesTrailing12Months']
        margins = stock.info['grossMargins']
        cash = stock.info['totalCash']
        debt = stock.info['totalDebt']
        ebitda = stock.info['ebitda']
        rec = stock.info['recommendationMean']

    # must manually fix price/sales if international stock
    if 'financialCurrency' not in stock.info:
        currency = 'USD'
    else:
        currency = stock.info['financialCurrency']
    if currency != 'USD':
        ps = getManualPS(stock, currency)

    # rank calculation
    if [x for x in (revenue_growth, ps, margins, cash, debt, ebitda, rec) if x is None or x == 0]:
        tier = 'NA'
    else:
        tier = getRank(stock, revenue_growth, ps, margins, cash, debt, ebitda, rec)
    return tier, revenue_growth, ps, margins, cash, debt, ebitda, rec


def insertExchanges():
    insertIntoExchange("NasdaqGS", "New York City, U.S.", "UTC-5 (-4)")
    insertIntoExchange("NasdaqGM", "New York City, U.S.", "UTC-5 (-4)")
    insertIntoExchange("NasdaqCM", "New York City, U.S.", "UTC-5 (-4)")
    insertIntoExchange("NYSE", "New York City, U.S.", "UTC-5 (-4)")
    insertIntoExchange("NYSE American", "New York City, U.S.", "UTC-5 (-4)")
    insertIntoExchange("BATS Global Markets", "Lenexa, U.S.", "UTC-6 (-5)")


def insertInsideOf(stock):
    exchange_code = stock.info['exchange']
    if exchange_code == 'NMS':
        insertIntoInsideOf(stock.info['symbol'], "NasdaqGS")
    elif exchange_code == 'NGM':
        insertIntoInsideOf(stock.info['symbol'], "NasdaqGM")
    elif exchange_code == 'NCM':
        insertIntoInsideOf(stock.info['symbol'], "NasdaqCM")
    elif exchange_code == 'NYQ':
        insertIntoInsideOf(stock.info['symbol'], "NYSE")
    elif exchange_code == 'ASE':
        insertIntoInsideOf(stock.info['symbol'], "NYSE American")
    elif exchange_code == 'BTS':
        insertIntoInsideOf(stock.info['symbol'], "BATS Global Markets")


def insertPrices(symbol):
    start = dt.datetime(2020, 1, 1)
    end = dt.datetime(2021, 9, 30)
    data = pdr.get_data_yahoo(symbol, start, end)
    for index, row in data.iterrows():
        date = index.to_pydatetime()
        insertIntoPrices(symbol, date, float(row['Open']), float(row['Close']), float(row['Volume']))
        print(date)


def main():
    # insertRanks()
    # insertExchanges()
    with open("/Users/nlogan/PycharmProjects/StockRank/NasdaqMidPlus.csv", "r") as f:
        reader = csv.reader(f, delimiter=",")
        for i, line in enumerate(reader):
            if i < 1:  # skip the first line
                continue
            symbol, company_name, _, _, _, market_cap, country, _, _, sector, industry = line
            stock = yf.Ticker(symbol)

            country = stock.info['country'] if 'country' in stock.info else country
            sector = stock.info['sector'] if 'sector' in stock.info else sector
            industry = stock.info['industry'] if 'industry' in stock.info else industry
            description = stock.info['longBusinessSummary'] if 'longBusinessSummary' in stock.info else "<none>"
            logo = stock.info['logo_url'] if 'logo_url' in stock.info else "<none>"

            # updateIntoCompany(i, company_name, sector, industry, country, market_cap, description, logo)
            # updateIntoStocks(symbol, i, *getStockInfo(stock))
            # insertInsideOf(stock)
            # insertPrices(symbol) # have done all stocks greater than 200B market cap
            print(i)


main()
