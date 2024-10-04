from selenium import webdriver
from selenium.webdriver.edge.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select, WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import random

# Caminho para o driver do Edge
driver_path = r'C:\Users\walac\Downloads\edgedriver_win64\msedgedriver.exe'

# Lista de nomes de produtos aleatórios
nomes_produtos = ['maçã gala', 'banana prata', 'laranja', 'uva', 'kiwi', 'morango', 'abacaxi']

def gerar_valor_aleatorio():
    """Gera um valor aleatório entre 0,99 e 9,99 com duas casas decimais."""
    valor = round(random.uniform(0.99, 9.99), 2)
    return f"{valor:.2f}".replace('.', ',')

def executar_processo(driver):
    # Acesse o arquivo HTML local
    driver.get('file:///C:/Users/walac/OneDrive/Área%20de%20Trabalho/erp/Frontend/html/produtos.html')

    # Aguarde alguns segundos para garantir que a página carregou
    time.sleep(3)

    # Escolha um nome de produto aleatório
    nome_aleatorio = random.choice(nomes_produtos)
    campo_nome = driver.find_element(By.ID, 'nomeProduto')
    campo_nome.send_keys(nome_aleatorio)

    time.sleep(1)

    # Gera um valor aleatório
    valor_aleatorio = gerar_valor_aleatorio()
    campo_valor = driver.find_element(By.ID, 'valorProduto')
    campo_valor.send_keys(valor_aleatorio)

    # Aguarde o dropdown estar presente antes de continuar
    wait = WebDriverWait(driver, 10)
    wait.until(EC.presence_of_element_located((By.ID, 'categoria')))

    # Randomizar o índice entre 0 e 3 (ou o número de opções disponíveis - 1)
    indice_randomizado = random.randint(0, 3)  # Para um select com 4 opções

    # Encontre o elemento <select> pelo 'id'
    dropdown = Select(driver.find_element(By.ID, 'categoria'))

    # Selecionar pelo índice aleatório
    dropdown.select_by_index(indice_randomizado)

    # Aguarde alguns segundos para ver o resultado
    time.sleep(3)

    # Espera até que o botão esteja clicável antes de clicar
    button = wait.until(EC.element_to_be_clickable((By.ID, 'adicionarBtn')))
    button.click()

    # Aguarde mais alguns segundos para ver o resultado após clicar no botão
    time.sleep(3)

# Inicializa o serviço do WebDriver para o Edge
service = Service(executable_path=driver_path)
driver = webdriver.Edge(service=service)

# Loop para repetir o processo 10 vezes
for i in range(150):
    print(f"Executando o processo {i + 1} de 150...")
    executar_processo(driver)

print("O programa foi encerrado.")

# Mantenha o navegador aberto até que o usuário decida fechá-lo
input("Pressione Enter para fechar o navegador...")
driver.quit()  # Fecha o navegador após o Enter ser pressionado 
