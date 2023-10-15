import csv
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By

def search_and_get_spotify_url(query):
    driver = webdriver.Chrome()
    driver.get("https://www.google.com")
    search_box = driver.find_element(by=By.NAME,value="q")
    search_box.send_keys(query + " Spotify")
    search_box.send_keys(Keys.RETURN)

    driver.implicitly_wait(5)

    search_results = driver.find_element(by=By.CSS_SELECTOR,value="h3.LC20lb.MBeuO.DKV0Md")
    if search_results:
        first_result = search_results
        first_result.click()

        driver.implicitly_wait(5)
    
        spotify_artist_name = driver.find_element(by=By.CSS_SELECTOR,value="h1.Type__TypeElement-sc-goli3j-0.dYGhLW").text
        spotify_url = driver.current_url

        driver.quit()
        return [spotify_url,spotify_artist_name]
    else:
        driver.quit()
        return None

input_csv_path = "artist.csv"
output_csv_path = "output.csv"

data = []

with open(input_csv_path, "r") as input_file, open(output_csv_path, "w", newline="") as output_file:
    csv_reader = csv.reader(input_file)
    csv_writer = csv.writer(output_file)

    for row in csv_reader:
        data.extend(row)

    csv_writer.writerow(["Input", "Name", "Spotify URL","Artist ID"])

    for elem in data:
        input_data = elem
        spotify_url_andname = search_and_get_spotify_url(input_data)
        
        csv_writer.writerow([input_data, spotify_url_andname[1] , spotify_url_andname[0], spotify_url_andname[0][32:]])

print("Results saved to", output_csv_path)

