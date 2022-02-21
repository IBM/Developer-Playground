#!/usr/bin/python3

# -*- coding: utf-8 -*-
# Licensed under the Apache License, Version 2.0 (the "License"); you may
# not use this file except in compliance with the License. You may obtain
# a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
# WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
# License for the specific language governing permissions and limitations
# under the License.

import json
import os
import requests
from dotenv import load_dotenv
from flask import Flask, request, session, render_template, flash, send_from_directory
from requests.auth import HTTPBasicAuth
from flask_wtf.csrf import CSRFProtect
from flask import make_response

app = Flask(__name__)
csrf = CSRFProtect(app)

app.config.update(dict(
    DEBUG=False,
    SECRET_KEY=os.environ.get('SECRET_KEY', 'development key'),
))

strings = {
    "CHECKINGSTATUS": ["no_checking", "less_0", "0_to_200", "greater_200"],
    "CREDITHISTORY": ["outstanding_credit", "prior_payments_delayed", "credits_paid_to_date", "all_credits_paid_back", "no_credits"],
    "EMPLOYMENTDURATION": ["unemployed", "less_1", "1_to_4", "4_to_7", "greater_7"],
    "EXISTINGSAVINGS": ["unknown", "less_100", "100_to_500", "500_to_1000", "greater_1000"],
    "FOREIGNWORKER": ["yes", "no"],
    "HOUSING": ["own", "free", "rent"],
    "INSTALLMENTPLANS": ["none", "stores", "bank"],
    "JOB": ["skilled", "management_self-employed", "unemployed", "unskilled"],
    "OWNSPROPERTY": ["car_other", "savings_insurance", "unknown", "real_estate"],
    "SEX": ["female", "male"],
    "TELEPHONE": ["yes", "none"],
    "LOANPURPOSE": ["repairs", "appliances", "car_new", "furniture", "car_used", "business", "radio_tv", "education", "vacation", "other", "retraining"],
    "OTHERSONLOAN": ["none", "co-applicant", "guarantor"]
}
stringstag = {
    "Checking Status": ["No Checking", "< 0", "0 to 200", "> 200"],
    "Credit History": ["Outstanding Credit", "Prior Payments Delayed", "Credits Paid to Date", "All Credits Paid Back", "No Credits"],
    "Employment Duration": ["Unemployed", "< 1", "1 to 4", "4 to 7", "> 7"],
    "Existing Savings": ["unknown", "< 100", "100 to 500", "500 to 1000", "> 1000"],
    "Foreign Worker": ["Yes", "No"],
    "Housing": ["Own", "free", "Rent"],
    "Installment Plans": ["None", "Stores", "Bank"],
    "Job": ["Skilled", "Management Self-employed", "Unemployed", "Unskilled"],
    "Owns Property": ["Car", "Savings Insurance", "Unknown", "Real Estate"],
    "Sex": ["Female", "Male"],
    "Telephone": ["Yes", "None"],
    "Loan Purpose": ["Repairs", "Appliances", "Car New", "Furniture", "Car Used", "Business", "Radio TV", "Education", "Vacation", "Other", "Retraining"],
    "Others on Loan": ["None", "Co-applicant", "Guarantor"]
} 
# min, max, default value
floats = {
    "INSTALLMENTPERCENT": [1, 10, 3],
    "LOANAMOUNT": [200, 750000, 3500]
}
floatstag = {
    "Installment Percent": [1, 10, 3],
    "Loan Amount": [200, 750000, 3500]
}

# min, max, default value
ints = {
    "AGE": [18, 80, 35],
    "DEPENDENTS": [0, 10, 1],
    "CURRENTRESIDENCEDURATION": [1, 10, 3],
    "EXISTINGCREDITSCOUNT": [1, 7, 1],
    "LOANDURATION": [1, 72, 24]
}
intstag = {
    "Age": [18, 80, 35],
    "Dependents": [0, 10, 1],
    "Current Residence Duration": [1, 10, 3],
    "Existing Credits Count": [1, 7, 1],
    "Loan Duration": [1, 72, 24]
}

labels = ["No Risk", "Risk"]


def generate_input_lines():
        
    result = f'<table align="center">'

    counter = 0
    for k, i in zip(floats.keys(), floatstag.keys()):
        minn, maxx, vall = floats[k]
        if (counter % 2 == 0):
            result += f'<tr>'
        result += f'<td style="padding-bottom:24px; height: 16px; width: 288px;line-height: 16px; font-family: IBM Plex Sans;"><span style="color: #525252;">{i}</span>'
        result += f'<br><br>'
        result += f'<input style="padding-left: 16px; color: black; margin-right:10px; border: 1px solid #8D8D8D; border-width: 0px 0px  1px 0px;height: 48px; width: 288px; background-color: #F4F4F4;" type="number" class="form-control" min="{minn}" max="{maxx}" step="1" name="{k}" id="{k}" value="{vall}" required (this.value)">'
        result += f'</td>'
        if (counter % 2 == 1):
            result += f'</tr>'
        counter = counter + 1

    counter = 0
    for k,i in zip(ints.keys(),intstag.keys()):
        minn, maxx, vall = ints[k]
        if (counter % 2 == 0):
            result += f'<tr>'
        result += f'<td style="padding-bottom:24px; height: 16px; width: 288px;line-height: 16px; font-family: IBM Plex Sans;"><span style="color: #525252;">{i}</span>'
        result += f'<br><br>'
        result += f'<input style="padding-left: 16px;  color: black; margin-right:10px; border: 1px solid #8D8D8D; border-width: 0px 0px  1px 0px;height: 48px; width: 288px; background-color: #F4F4F4;" type="number" class="form-control" min="{minn}" max="{maxx}" step="1" name="{k}" id="{k}" value="{vall}" required (this.value)">'
        result += f'</td>'
        if (counter % 2 == 1):
            result += f'</tr>'
        counter = counter + 1

    counter = 0
    for k, i in zip(strings.keys(), stringstag.keys()):
        if (counter % 2 == 0):
            result += f'<tr>'
        result += f'<td style="padding-bottom:24px; height: 16px; width: 288px;line-height: 16px; font-family: IBM Plex Sans;"><span style="color: #525252;">{i}</span>'
        result += f'<br><br>'
        result += f'<select style="padding-left: 16px; color: black; margin-right:10px; border: 1px solid #8D8D8D; border-width: 0px 0px  1px 0px;height: 48px; width: 288px; background-color: #F4F4F4;" class="form-control" name="{k}">'
        for value, j in zip(strings[k], stringstag[i]):
            result += f'<option value="{value}" selected>{j}</option>'
        result += f'</select>'
        result += f'</td>'
        if (counter % 2 == 1):
            result += f'</tr>'
        counter = counter + 1

    result += f'</table>'

    return result


app.jinja_env.globals.update(generate_input_lines=generate_input_lines)

class riskForm():
    @app.route('/js/<path:path>')
    def send_js(path):     
        return send_from_directory('templates/js', path)

    @app.route('/img/<path:path>')
    def send_img(path):     
        return send_from_directory('templates/img', path)
    

    @app.route('/css/<path:path>')
    def send_css(path):     
        return send_from_directory('templates/css', path)

    @app.route('/fonts/<path:path>')
    def send_fonts(path): 
        return send_from_directory('templates/fonts', path)

    @app.route('/', methods=['GET', 'POST'])
    def index():
        if request.method == 'POST':
            ID = 999

            session['ID'] = ID
            data = {}

            for k, v in request.form.items():
                data[k] = v
                session[k] = v

            scoring_href = os.environ.get('MODEL_URL')

            if not (scoring_href):
                raise EnvironmentError('[ENV VARIABLES] Please set "URL".')

            for field in ints.keys():
                data[field] = int(data[field])
            for field in floats.keys():
                data[field] = float(data[field])

            input_data = list(data.keys())
            input_values = list(data.values())

            csrf=input_values[0]
            input_values.pop(0)
            input_data.pop(0)
            # print(csrf)
            
            #formatting the input data as per the AutoAI model
            userinput=list()

            userinput.append(input_data[7])
            userinput.append(input_data[6])
            userinput.append(input_data[8])
            userinput.append(input_data[18])
            userinput.append(input_data[1])
            userinput.append(input_data[10])
            userinput.append(input_data[9])
            userinput.append(input_data[0])
            userinput.append(input_data[16])
            userinput.append(input_data[19])
            userinput.append(input_data[4])
            userinput.append(input_data[15])
            userinput.append(input_data[2])
            userinput.append(input_data[13])
            userinput.append(input_data[12])
            userinput.append(input_data[5])
            userinput.append(input_data[14])
            userinput.append(input_data[3])
            userinput.append(input_data[17])
            userinput.append(input_data[11])

            uservalues=list()

            uservalues.append(input_values[7])
            uservalues.append(input_values[6])
            uservalues.append(input_values[8])
            uservalues.append(input_values[18])
            uservalues.append(input_values[1])
            uservalues.append(input_values[10])
            uservalues.append(input_values[9])
            uservalues.append(input_values[0])
            uservalues.append(input_values[16])
            uservalues.append(input_values[19])
            uservalues.append(input_values[4])
            uservalues.append(input_values[15])
            uservalues.append(input_values[2])
            uservalues.append(input_values[13])
            uservalues.append(input_values[12])
            uservalues.append(input_values[5])
            uservalues.append(input_values[14])
            uservalues.append(input_values[3])
            uservalues.append(input_values[17])
            uservalues.append(input_values[11])

            payload_scoring = {"input_data": [
                {"fields": userinput, "values": [uservalues]}
            ]}
        
            print("Payload is: ")
            # print(payload_scoring)

            API_KEY=os.environ.get('API_KEY')
            token_response = requests.post('https://iam.cloud.ibm.com/identity/token', data={"apikey": API_KEY, "grant_type": 'urn:ibm:params:oauth:grant-type:apikey'})
            mltoken = token_response.json()["access_token"]

            header_online = {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + mltoken}

            response_scoring = requests.post(
                scoring_href,
                json=payload_scoring,
                headers=header_online)
            result = response_scoring.json()

            print("Result is ", result)

            # result_json = json.loads(result)
            result_keys = result["predictions"][0]["fields"]
            result_vals = result["predictions"][0]["values"]

            result_dict = dict(zip(result_keys, result_vals[0]))
            loan_risk = result_dict["prediction"]
            no_percent = result_dict["probability"][0] * 100
            yes_percent = result_dict["probability"][1] * 100
            flash('Percentage of this loan representing risk is: %.0f%%'
                  % yes_percent)

            keystag1 = list(floatstag.keys())
            keystag2 = list(intstag.keys())
            keystag3 = list(stringstag.keys())
            keystag = keystag1+keystag2+keystag3
            # print("keys tag")
            # print(keystag)

            return render_template(
                'score.html',
                result=result_dict,
                loan_risk=loan_risk,
                yes_percent=yes_percent,
                no_percent=no_percent,
                response_scoring=response_scoring,
                labels=labels,
                keystag=keystag,
                input_values=input_values,
                zip=zip)

        else:
            return render_template('input.html')


load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))
port = os.environ.get('PORT', '5000')
host = os.environ.get('HOST', '0.0.0.0')
if __name__ == "__main__":
    app.run(host=host, port=int(port))