from sqlalchemy import create_engine, Table, MetaData
from sqlalchemy.exc import SQLAlchemyError
from rapidfuzz import process, fuzz
import pandas as pd
import os

# 데이터베이스 엔진 설정 (SQLite를 사용)
engine = create_engine('sqlite:///companies.db')

# 데이터베이스에 테이블이 없을 경우 테이블을 생성하고 CSV 데이터를 삽입하는 함수
def initialize_db_from_csv():
    # 현재 디렉토리에서 CSV 파일 경로 설정
    current_dir = os.path.dirname(os.path.abspath(__file__))
    csv_file_path = os.path.join(current_dir, 'companies.csv')

    # CSV 파일에서 데이터 불러오기
    if os.path.exists(csv_file_path):
        df = pd.read_csv(csv_file_path)

        # 데이터베이스에 테이블이 없으면 테이블을 생성하고 데이터를 삽입
        df.to_sql('companies', con=engine, if_exists='replace', index=False)
        print("Database initialized with CSV data.")
    else:
        print(f"CSV file not found at: {csv_file_path}")

# 데이터베이스에서 데이터를 가져오는 함수
def get_all_tickers_from_db():
    metadata = MetaData() 
    companies_table = Table('companies', metadata, autoload_with=engine)

    with engine.connect() as connection:
        query_result = connection.execute(companies_table.select()).mappings().all()

        df_from_db = pd.DataFrame(query_result)
    return df_from_db

# 검색 함수 구현 (대소문자 구분 없이 부분 일치 검색)
def search(query):
    if not query:
        return []

    query = query.lower()

    df_from_db = get_all_tickers_from_db()

    df_from_db['ticker_lower'] = df_from_db['ticker'].str.lower()

    # 'ticker_lower' 열에서 부분 일치 및 유사도 검색
    choices = df_from_db['ticker_lower'].tolist()

    # 부분 일치 검색 수행 
    top_results = process.extract(query, choices, limit=4, scorer=fuzz.partial_ratio)

    # 유사도가 낮은 항목은 필터링 (필요에 따라 유사도 기준을 조정할 수 있음)
    filtered_results = [result for result in top_results if result[1] >= 50]

    suggestions = df_from_db[df_from_db['ticker_lower'].isin([result[0] for result in filtered_results])].drop(columns=['ticker_lower']).to_dict(orient='records')

    return suggestions

# 데이터베이스가 초기화되지 않은 경우 CSV 파일에서 초기화
initialize_db_from_csv()

# 검색 테스트
# print("A: ", search("A"))
# print("AAP: ", search("AAP"))
