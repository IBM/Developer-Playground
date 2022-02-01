import React, { Component } from 'react';
import { TextInput, Row, Button, ToastNotification, Loading, RadioButtonGroup, RadioButton, FormGroup, Form, Grid, Column } from 'carbon-components-react';
import axios from 'axios';
import './churnForm.scss'
const initialUserState = {
  tenure: '',
  invalidTenure: false,
  tenureError: '',
  security: '',
  support: '',
  contract: '',
  dependents: '',
  phone: '',
  internet: '',
  payment: '',
  backup: '',
  charges: '',
  invalidCharges: false,
  chargesError: '',
  protection: '',
  paperless: '',
  isSubmitted: 'no',
  ChrunPred: ''
}
class ChurnForm extends Component {
  constructor(props) {
    super(props)
    this.state = initialUserState;

    this.onChangeTenure = this.onChangeTenure.bind(this);
    this.onChangeSecurity = this.onChangeSecurity.bind(this);
    this.onChangeSupport = this.onChangeSupport.bind(this);
    this.onChangeContract = this.onChangeContract.bind(this);
    this.onChangeDependents = this.onChangeDependents.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeInternet = this.onChangeInternet.bind(this);
    this.onChangePayment = this.onChangePayment.bind(this);
    this.onChangeBackup = this.onChangeBackup.bind(this);
    this.onChangeCharges = this.onChangeCharges.bind(this);
    this.onChangeProtection = this.onChangeProtection.bind(this);
    this.onChangePaperless = this.onChangePaperless.bind(this);
    this.submitHandler = this.submitHandler.bind(this);

  }

  onChangeTenure(event) {
    this.state.tenure = event.target.value
    console.log(this.state.tenure)
  }
  onChangeSecurity(event) {

    this.state.security = event.target.value
    console.log(this.state.security)

  }
  onChangeSupport(event) {

    this.state.support = event.target.value
    console.log(this.state.support)

  }
  onChangeContract(event) {

    this.state.contract = event.target.value
    console.log(this.state.contract)

  }
  onChangeDependents(event) {

    this.state.dependents = event.target.value
    console.log(this.state.dependents)

  }
  onChangePhone(event) {

    this.state.phone = event.target.value
    console.log(this.state.phone)

  }
  onChangeInternet(event) {

    this.state.internet = event.target.value
    console.log(this.state.internet)

  }
  onChangePayment(event) {

    this.state.payment = event.target.value
    console.log(this.state.payment)

  }
  onChangeBackup(event) {

    this.state.backup = event.target.value
    console.log(this.state.backup)

  }
  onChangeCharges(event) {

    this.state.charges = event.target.value
    console.log(this.state.charges)

  }
  onChangeProtection(event) {

    this.state.protection = event.target.value
    console.log(this.state.protection)

  }
  onChangePaperless(event) {

    this.state.paperless = event.target.value
    console.log(this.state.paperless)

  }

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  validate = () => {

    let tenureError = ''
    let chargesError = ''

    var numbers = /^[0-9]+$/;
    let isSubmitted = 'no'

    if (!this.state.tenure) {
      tenureError = 'Please enter tenure'
      this.setState({
        invalidTenure: true
      })
    }
    else {
      if (!this.state.tenure.match(numbers)) {
        tenureError = 'Tenure should be a number'
        this.setState({
          invalidTenure: true
        })
      }
    }
    if (!this.state.charges) {
      chargesError = 'Monthly Charges cannot be empty'
      this.setState({
        invalidCharges: true
      })
    }
    else {
      if (!this.state.charges.match(numbers)) {
        chargesError = 'Monthly Charges should be a number'
        this.setState({
          invalidCharges: true
        })
      }
    }

    if (tenureError || chargesError) {
      this.setState({
        tenureError, chargesError
      })
      return false
    } else {
      isSubmitted = 'yes'
      tenureError = ''
      chargesError = ''
      this.setState({
        invalidTenure: false,
        invalidCharges: false
      })

      this.setState({
        isSubmitted, tenureError, chargesError
      })
      console.log(this.state.isSubmitted)
      return true;
    }
  }
  submitHandler = (e) => {
    e.preventDefault()//to prevent page refresh

    const isValid = this.validate();
    if (isValid) {
      console.log(this.state)
      const data = {
        tenure: this.state.tenure,
        security: this.state.security,
        support: this.state.support,
        contract: this.state.contract,
        dependents: this.state.dependents,
        phone: this.state.phone,
        internet: this.state.internet,
        payment: this.state.payment,
        backup: this.state.backup,
        charges: this.state.charges,
        protection: this.state.protection,
        paperless: this.state.paperless,
        isSubmitted: this.state.isSubmitted
      }

      console.log(this.state.isSubmitted)
      console.log(data)

      axios.post(`${window.location.origin}/submit`,
        data)
        .then((response) => {
          this.setState({
            ChrunPred: response.data
          })
          console.log("Response is ", this.state.ChrunPred)
        }).catch(
          err => {
            console.log('error', err)
          }
        )
      console.log(this.state);
    }
  }
  render() {
    return (
      <div className="app">
        <div className="app-header" style={{ marginLeft: "-40px", width: "900px", height: "100px"}}>
        <br/>
          <h2 style={{marginTop: "5px"}}>Churn Prediction Application</h2>
        </div>
        {
          (this.state.isSubmitted == 'yes' && this.state.ChrunPred == '') ?

            (
              <div>
                <ToastNotification
                  kind='success'
                  title='Success'
                  caption='Form has been submitted'
                  lowContrast='false'
                  style={{ top: 0, right: 0, position: 'absolute', marginTop: '4rem' }}

                />
                <div className='tilePlacement'>
                  <Grid>
                    <Row>
                      <Column >

                        <center>
                          <Loading
                            description="Active loading indicator" withOverlay={false}
                          />
                          <div style={{ width: '40%', height: '4rem', marginTop: '4rem' }}>
                            <h4 class="alert-heading" >Your form has been submitted</h4>
                            <p>Now based on the deployed Watson Machine Learning model in Cloud Pak for data, predictions for the given input data will be displayed.
                            </p>
                            <hr></hr>
                            <p class="mb-0">Kindly wait for the response.</p>
                          </div>
                        </center>

                      </Column>
                    </Row>
                  </Grid>
                </div>
              </div>
            )
            :
            ''
        }
        {
          (this.state.isSubmitted == 'no') ?
            (
              <div>
                <Form style={{ width: '799px', marginTop: '65px' }} onSubmit={this.submitHandler}>
                  <Grid >
                    <Row>
                      <Column style={{ textAlign: 'left' }}>
                        <div className="customer-details">Customer details</div>
                      </Column>
                    </Row>
                    <Row>
                      <Column sm={2} md={5} lg={7} style={{ marginLeft: '40px', marginTop: '32px' }}>
                        <TextInput
                          id="tenure"
                          invalidText={this.state.tenureError}
                          labelText="Tenure"
                          placeholder="Number of months"
                          name='tenure'
                          value={this.state.tenure}
                          onChange={this.changeHandler}
                          invalid={this.state.invalidTenure}
                        />
                      </Column>
                    </Row>
                    <Row>
                      <Column sm={2} md={5} lg={7} style={{ marginTop: '24px', marginLeft: '40px' }}>
                        <TextInput
                          id="charges"
                          invalidText={this.state.chargesError}
                          labelText="Monthly Charges"
                          placeholder="Enter amount in numbers"
                          name='charges'
                          value={this.state.charges}
                          onChange={this.changeHandler}
                          invalid={this.state.invalidCharges}
                        />
                      </Column>
                    </Row>
                    <Row>
                      <Column style={{ marginLeft: '40px', marginTop: '28px' }}>
                        <FormGroup legendText="Online Security" onChange={this.onChangeSecurity} value={this.state.security} style={{ textAlign: 'left' }}>
                          <RadioButtonGroup
                            // defaultSelected="No"
                            // legend="Group Legend"
                            // name="radio-button-group"
                            labelPosition='right'
                            orientation='horizontal'
                          // className="radio-button-group-horizontal-"
                          >
                            <RadioButton
                              id="security_1"
                              labelText="Yes"
                              value="1"
                              name='security'
                            />
                            <RadioButton
                              id="security_0"
                              labelText="No"
                              value="0"
                              name='security'
                            />
                          </RadioButtonGroup>
                        </FormGroup>
                      </Column>
                      <Column sm={3} md={2} lg={3} style={{ marginLeft: '40px', marginTop: '28px' }}>
                        <FormGroup legendText="Technical Support" onChange={this.onChangeSupport} value={this.state.support} style={{ textAlign: 'left' }}>
                          <RadioButtonGroup
                            // className="radio-button-group-horizontal-"
                            // defaultSelected="No"
                            // legend="Group Legend"
                            // name="radio-button-group"
                            labelPosition='right'
                            orientation='horizontal'
                          >
                            <RadioButton
                              id="support-1"
                              labelText="Yes"
                              value="1"
                              name='support'
                            />
                            <RadioButton
                              id="support-0"
                              labelText="No"
                              value="0"
                              name='support'
                            />
                          </RadioButtonGroup>
                        </FormGroup>
                      </Column>
                      <Column sm={3} md={3} lg={4} style={{ marginLeft: '40px', marginTop: '28px' }}>
                        <FormGroup legendText="Phone Service" onChange={this.onChangePhone} value={this.state.phone} style={{ textAlign: 'left' }}>
                          <RadioButtonGroup
                            // defaultSelected="No"
                            // legend="Group Legend"
                            // name="radio-button-group"
                            // valueSelected='No'
                            // className="radio-button-group-horizontal-"
                            labelPosition='right'
                            orientation='horizontal'
                          >
                            <RadioButton
                              id="phone-1"
                              labelText="Yes"
                              value="1"
                              name='phone'

                            />
                            <RadioButton
                              id="phone-0"
                              labelText="No"
                              value="0"
                              name='phone'
                            />
                          </RadioButtonGroup>
                        </FormGroup>
                      </Column>
                    </Row>
                    <Row>
                      <Column style={{ marginLeft: '40px', marginTop: '10px' }}>
                        <FormGroup legendText="Dependents" onChange={this.onChangeDependents} value={this.state.dependents} style={{ textAlign: 'left' }}>
                          <RadioButtonGroup
                            // defaultSelected="No"
                            // legend="Group Legend"
                            // name="radio-button-group"
                            // className="radio-button-group-horizontal-"
                            labelPosition='right'
                            orientation='horizontal'
                          >
                            <RadioButton
                              id="dependents-1"
                              labelText="Yes"
                              value="1"
                              name='dependents'
                            />
                            <RadioButton
                              id="dependents-0"
                              labelText="No"
                              value="0"
                              name='dependents'
                            />
                          </RadioButtonGroup>
                        </FormGroup>
                      </Column>
                      <Column sm={3} md={2} lg={3} style={{ marginLeft: '40px', marginTop: '10px' }}>
                        <FormGroup legendText="Device Protection" onChange={this.onChangeProtection} value={this.state.protection} style={{ textAlign: 'left' }}>
                          <RadioButtonGroup
                            // defaultSelected="No"
                            // legend="Group Legend"
                            // name="radio-button-group"
                            // className="radio-button-group-horizontal-"
                            labelPosition='right'
                            orientation='horizontal'
                          >
                            <RadioButton
                              id="protection-1"
                              labelText="Yes"
                              value="1"
                              name='protection'

                            />
                            <RadioButton
                              id="protection-0"
                              labelText="No"
                              value="0"
                              name='protection'
                            />
                          </RadioButtonGroup>
                        </FormGroup>
                      </Column>
                      <Column sm={3} md={3} lg={4} style={{ marginLeft: '40px', marginTop: '10px' }}>
                        <FormGroup legendText="Paperless Billing" onChange={this.onChangePaperless} value={this.state.paperless} style={{ textAlign: 'left' }}>
                          <RadioButtonGroup
                            // defaultSelected="No"
                            // legend="Group Legend"
                            // name="radio-button-group"
                            // valueSelected='No'
                            // className="radio-button-group-horizontal-"
                            labelPosition='right'
                            orientation='horizontal'
                          >
                            <RadioButton
                              id="paperless-1"
                              labelText="Yes"
                              value="1"
                              name='paperless'

                            />
                            <RadioButton
                              id="paperless-0"
                              labelText="No"
                              value="0"
                              name='paperless'
                            />
                          </RadioButtonGroup>
                        </FormGroup>
                      </Column>
                    </Row>

                    <Row>
                      <Column style={{ marginLeft: '40px', marginTop: '10px' }}>
                        <FormGroup legendText="Online Backup" onChange={this.onChangeBackup} value={this.state.backup} style={{ textAlign: 'left' }}>
                          <RadioButtonGroup
                            // defaultSelected="No"
                            // // legend="Group Legend"
                            // name="radio-button-group"
                            // valueSelected='No'
                            // className="radio-button-group-horizontal-"
                            labelPosition='right'
                            orientation='horizontal'
                          >
                            <RadioButton
                              id="backup-1"
                              labelText="Yes"
                              value="1"
                              name='backup'

                            />
                            <RadioButton
                              id="backup-0"
                              labelText="No"
                              value="0"
                              name='backup'
                            />
                          </RadioButtonGroup>
                        </FormGroup>
                      </Column>
                    </Row>

                    <Row>
                      <Column style={{ marginLeft: '40px', marginTop: '10px' }}>
                        <FormGroup legendText="Internet Service" onChange={this.onChangeInternet} value={this.state.internet} style={{ textAlign: 'left' }}>
                          <RadioButtonGroup
                            // defaultSelected="No"
                            // legend="Group Legend"
                            // name="radio-button-group"
                            // className="radio-button-group-horizontal-"
                            labelPosition='right'
                            orientation='horizontal'
                          >
                            <RadioButton
                              id="internet-1"
                              labelText="DSL"
                              value="1"
                              name='internet'

                            />
                            <RadioButton
                              id="internet-2"
                              labelText="Fiber Optics"
                              value="2"
                              name='internet'
                            />
                            <RadioButton
                              id="internet-3"
                              labelText="No"
                              value="3"
                              name='internet'
                            />
                          </RadioButtonGroup>
                        </FormGroup>
                      </Column>
                      <Column sm={3} md={4} lg={4} style={{ marginLeft: '40px', marginTop: '10px' }}>
                        <FormGroup legendText="Contract" onChange={this.onChangeContract} value={this.state.contract} style={{ textAlign: 'left' }}>
                          <RadioButtonGroup
                            // defaultSelected="No"
                            // legend="Group Legend"
                            // name="radio-button-group"
                            // className="radio-button-group-horizontal-"
                            labelPosition='right'
                            orientation='horizontal'
                          >
                            <RadioButton
                              id="contract-1"
                              labelText="One year"
                              value="1"
                              name='contract'
                            />
                            <RadioButton
                              id="contract-2"
                              labelText="Two year"
                              value="2"
                              name='contract'
                            />
                            <RadioButton
                              id="contract-3"
                              labelText="Monthly"
                              value="3"
                              name='contract'
                            />
                          </RadioButtonGroup>
                        </FormGroup>
                      </Column>
                    </Row>
                    <Row>
                      <Column style={{ marginLeft: '40px', marginTop: '12px' }}>
                        <FormGroup legendText="Payment Method" onChange={this.onChangePayment} value={this.state.payment} style={{ textAlign: 'left' }}>
                          <RadioButtonGroup
                          // defaultSelected="No"
                          // legend="Group Legend"
                          // name="radio-button-group"
                          // className="radio-button-group-horizontal-"
                          >
                            <RadioButton
                              id="payment-1"
                              labelText="Credit Card"
                              value="1"
                              name='payment'

                            />
                            <RadioButton
                              id="payment-2"
                              labelText="Bank Transfer"
                              value="2"
                              name='payment'
                            />
                            <RadioButton
                              id="payment-3"
                              labelText="Electronic Check"
                              value="3"
                              name='payment'
                            />
                            <RadioButton
                              id="payment-4"
                              labelText="Mailed Check"
                              value="4"
                              name='payment'
                            />
                          </RadioButtonGroup>
                        </FormGroup>
                      </Column>
                    </Row>

                    <Row>
                      <Column sm={1} md={1} lg={1} style={{ marginLeft: '40px', marginTop: '12px', marginBottom: '40px', textAlign: 'left' }}>
                        <Button className="button-01-primary-default-01-t" kind='tertiary' type="submit" >Submit</Button>
                      </Column>
                    </Row>
                  </Grid>

                </Form>
              </div>
            ) :
            (
              ''
            )
        }
        {
          (this.state.ChrunPred == 'churn' && this.state.isSubmitted == 'yes') ?
            (
              <div>
                <div className='tilePlacement2' >
                  <Grid>
                    <Row>
                      <Column>
                        <center>
                          <div class="alert alert-danger" role="alert" >
                            <h4 class="alert-heading">Sorry!</h4>
                            <p>Your customer will churn.</p>
                            <hr></hr>
                            <p class="mb-0">Thank you for using our site</p>
                          </div>
                        </center>

                      </Column>
                    </Row>
                  </Grid>


                </div>
              </div>

            )
            :
            ''
        }
        {
          (this.state.ChrunPred == 'notchurn' && this.state.isSubmitted == 'yes') ?
            (
              <div>
                <div className='tilePlacement2' >
                  <Grid>
                    <Row>
                      <Column >

                        <center>
                          <div class="alert alert-success" role="alert" >
                            <h4 class="alert-heading">Congratulations!!</h4>
                            <p>Your customer will not churn.</p>
                            <hr></hr>
                            <p class="mb-0">Thank you for using our site</p>
                          </div>
                        </center>

                      </Column>
                    </Row>
                  </Grid>


                </div>
              </div>

            )
            :
            ''

        }
      </div>
    )
  }
}
export default ChurnForm;
