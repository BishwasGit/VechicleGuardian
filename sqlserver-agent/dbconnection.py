from sqlalchemy import create_engine
from sqlalchemy.exc import OperationalError

# Define the MySQL connection URI
db_uri = "mysql+mysqlconnector://Bishwas:Bishwas%401@localhost:3306/ims"

try:
    # Try to create an engine and connect
    engine = create_engine(db_uri)
    connection = engine.connect()
    print('Database connection successful')
    # Close the connection
    connection.close()
except OperationalError as e:
    print('Database connection failed:', e)
