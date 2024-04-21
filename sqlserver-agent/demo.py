from langchain.agents import create_sql_agent
from langchain.agents.agent_toolkits import SQLDatabaseToolkit
from langchain.sql_database import SQLDatabase
from langchain.llms.openai import OpenAI
from langchain.agents import AgentExecutor
from langchain.agents.agent_types import AgentType
from langchain_community.chat_models import ChatOpenAI
import os


os.environ["OPENAI_API_KEY"] = "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"
sql_server_db_uri = "mysql+mysqlconnector://Bishwas:Bishwas%401@localhost:3306/ims"
db = SQLDatabase.from_uri(database_uri=sql_server_db_uri)
toolkit = SQLDatabaseToolkit(db=db, llm=OpenAI(temperature=0))
agent_executor = create_sql_agent(
    llm=ChatOpenAI(temperature=0, model="gpt-3.5-turbo-16k-0613"),
    toolkit=toolkit,
    verbose=True,
    agent_type=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
)
agent_executor.run("can you list all the data in inventories ?")
