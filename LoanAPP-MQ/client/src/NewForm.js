import React, { Component } from 'react';
import {TextInput,Row,Button,ToastNotification,ProgressStep,ProgressIndicator,Loading,InlineNotification,NotificationActionButton, RadioButtonGroup,RadioButton, FormGroup, Tooltip,Link, Form, Grid, Column, Tile, FormLabel} from 'carbon-components-react';
import axios from 'axios';
import cloudLogo from './cloudLogo.png';
import './newForm.scss'
const initialUserState={
    age:'',
    invalidAge:false,
    ageError:'',
    experience:'',
    invalidExperience:false,
    experienceError:'',
    income:'',
    invalidIncome:false,
    incomeError:'',
    Zipcode:'',
    invalidZipcode:false,
    ZipcodeError:'',
    familySize:'',
    invalidFamilySize:false,
    familyError:'',
    Ccavg:'',
    invalidCcavg:false,
    CcavgError:'',
    mortgage:'',
    invalidMortgage:false,
    mortgageError:'',
    education:'',
    personal_loan:'',
    security_account:'',
    CdAccount:'',
    online:'',
    credit_card:'',
    isSubmitted:'no',
    LoanResponse:''
  }
  

class NewForm extends Component{
constructor(props){
    super(props)
    this.state=initialUserState;
    
    this.onChangeSecurityAccount=this.onChangeSecurityAccount.bind(this);
    this.onChangeEducation=this.onChangeEducation.bind(this)
    this.onChangeOnline=this.onChangeOnline.bind(this)
    this.onChangeCdAccount=this.onChangeCdAccount.bind(this)
    this.onChangeCreditCard=this.onChangeCreditCard.bind(this)
    this.submitHandler=this.submitHandler.bind(this);

}

 onChangeSecurityAccount(event) {
    
  this.state.security_account=event.target.value
  console.log(this.state.security_account)
   
 }
 onChangeEducation(event) {
    
  this.state.education=event.target.value
  console.log(this.state.education)
   
 }
 onChangeCreditCard(event) {
    
  this.state.credit_card=event.target.value
  console.log(this.state.credit_card)
   
 }
 onChangeCdAccount(event) {
    
  this.state.CdAccount=event.target.value
  console.log(this.state.CdAccount)
   
 }
 onChangeOnline(event) {
    
  this.state.online=event.target.value
  console.log(this.state.online)
   
 }

changeHandler=(e)=>{
    this.setState({
      [e.target.name]:e.target.value
    })
  }
  validate=()=>{
    
    let ageError=''
    let experienceError=''
    let incomeError=''
    let ZipcodeError=''
    let  familyError=''
    let CcavgError=''
    let  mortgageError=''
    
    var numbers = /^[0-9]+$/;
    let isSubmitted='no'
   
  if(!this.state.age){
    ageError='Please enter your age'
    this.setState({
      invalidAge:true
    })
  }
  else{
    if(!this.state.age.match(numbers)){
      ageError='Age should be a number'
      this.setState({
        invalidAge:true
      })
    }
  }
  if(!this.state.experience){
    experienceError='Experience cannot be empty'
    this.setState({
      invalidExperience:true
    })
  }
  else{
    if(!this.state.experience.match(numbers)){
        experienceError='Experience should be a number'
        this.setState({
          invalidExperience:true
        })
    }
  }

  if(!this.state.income){
    incomeError='Income cannot be empty'
    this.setState({
      invalidIncome:true
    })
  }
  else{
    if(!this.state.income.match(numbers)){
      incomeError='Income should be a number'
      this.setState({
        invalidIncome:true
      })
    }
  }
  if(!this.state.Zipcode){
    ZipcodeError='Zipcode cannot be empty'
    this.setState({
      invalidZipcode:true
    })
  }
  else{
    if(!this.state.Zipcode.match(numbers)){
      ZipcodeError='Zipcode should be a number'
      this.setState({
        invalidZipcode:true
      })
    }
  }
  if(!this.state.familySize){
    familyError='Please enter family size'
    this.setState({
      invalidFamilySize:true
    })
  }
  else{
    if(!this.state.familySize.match(numbers)){
      familyError='family size should be in numbers'
      this.setState({
        invalidFamilySize:true
      })
    }
  }
  if(!this.state.mortgage){
    mortgageError='Mortgage value cannot be empty'
    this.setState({
      invalidMortgage:true
    })
  }
  else{
    if(!this.state.mortgage.match(numbers)){
      mortgageError='Mortgage value should be a number'
      this.setState({
        invalidMortgage:true
      })
    }
  }
  if(!this.state.Ccavg){
    CcavgError='Please enter Ccavg value'
    this.setState({
      invalidCcavg:true
    })
    
  }
  else{
    if(!this.state.Ccavg.match(numbers)){
      CcavgError='Ccavg value should be in numbers'
      this.setState({
        invalidCcavg:true
      })
      
    }
  }
  if( ageError || experienceError || familyError|| mortgageError || CcavgError || incomeError || ZipcodeError ){
  this.setState({
        ageError,experienceError,familyError,mortgageError,CcavgError,incomeError,ZipcodeError
      })
      return false
    }else{
      isSubmitted='yes'
      ageError=''
      experienceError=''
      incomeError=''
      ZipcodeError=''
      familyError=''
      CcavgError=''
      mortgageError=''
      this.setState({
        invalidAge:false,
        invalidCcavg:false,
        invalidExperience:false,
        invalidFamilySize:false,
        invalidIncome:false,
        invalidMortgage:false,
        invalidZipcode:false
      })

      this.setState({
        isSubmitted,ageError,experienceError,familyError,mortgageError,CcavgError,incomeError,ZipcodeError
      })
      console.log(this.state.isSubmitted)
       return true;
    }
  }
  submitHandler=(e)=>{
    e.preventDefault()//to prevent page refresh
    
   const isValid=this.validate();
  if(isValid){
    console.log(this.state)
    const data={
      age:this.state.age,
      experience:this.state.experience,
      income:this.state.income,
      Zipcode:this.state.Zipcode,
      familySize:this.state.familySize,
      Ccavg:this.state.Ccavg,
      mortgage:this.state.mortgage,
      education:this.state.education,
      personal_loan:'none',
      security_account:this.state.security_account,
      CdAccount:this.state.CdAccount,
      online:this.state.online,
      credit_card:this.state.credit_card,
      isSubmitted:this.state.isSubmitted,
      
    }
    
    console.log(this.state.isSubmitted)
    console.log(data)
  
    axios.post(`${window.location.origin}/submit`, 
     data )
    .then( (response)=> {
      
      
      
      this.setState({
        LoanResponse:response.data
      })
     console.log("Response is ",this.state.LoanResponse)
    }).catch(
      err=>{
        console.log('error',err)
      }
    )
    console.log(this.state);
  }
}
    render(){
        return(
            <div>
              {
                  (this.state.isSubmitted== 'yes' && this.state.LoanResponse=='')?
    
                  (
                    <div>

                    <ToastNotification
                            kind='success'
                            title='Success'
                            caption='Form has been submitted'
                            lowContrast='false'
                            style={{ top:0,right:0,position:'absolute',marginTop:'4rem' }}
                            
                          />
                  <div className='tilePlacement'>
                    <Grid>
                      <Row>
                        <Column >
                          
                          <center>
                            <Loading
                              description="Active loading indicator" withOverlay={false}
                            />
                            <div  style={{width:'40%',height:'4rem',marginTop:'4rem'}}> 
                              <h4 class="alert-heading" >Wooah! Your form has been submitted &#128516;</h4>
                              <p>Now based on the deployed watson machine learning model in cloudPak for data, predictions for the given input data will be displayed.
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
              (this.state.isSubmitted=='no')?
              (

              
              <div>
                  <div class="header">
                  <br/>
                    <img src={cloudLogo} style={{width:'5rem',height:'4rem'}}/>
                  <br/>
                    <h3 style={{color:'white',}}>Loan Processing Application</h3>
                    <center>
                      <p style={{textAlign:'center'}}>This application leverages the useage of Cloud Pak for data and Cloud Pak for Application</p>
                    </center>
                
                  </div>
              <br/>
            
              
                  <Form style={{marginTop:'2rem'}} onSubmit={this.submitHandler}>
                    <Grid >
                    <Row>
                      <Column sm={3} md={5} lg={4}>
                        <h3 style={{float:'left',marginLeft:'1rem'}}>Enter loan details</h3>
                        <br/>
                       
                      </Column>
                    </Row>
                    <br/>
                    <br/>
                    <Row>
                      <Column sm={3} md={5} lg={4}>
                        <h5 style={{float:'left',marginLeft:'1rem'}}>1. Personal Information</h5>
                        <br/>
                        
                      </Column>
                      <br/>
                      
                    </Row>
                    <br/>
                        <Row>
                            <Column sm={3} md={5} lg={4}>
                                    
                
                                    <TextInput
                                        //helperText="Age should be a number"
                                        
                                        id="age"
                                        invalidText={this.state.ageError}
                                        labelText="Age"
                                        placeholder="Enter customer age"
                                        name='age'
                                        value={this.state.age}
                                        onChange={this.changeHandler}
                                        invalid={this.state.invalidAge}
                                        inline
                                        
                                    />
                                
                    
                            </Column>
                            
                        </Row>
                        <br/>
                        <Row>
                            <Column sm={3} md={5} lg={4}>
                                
                
                                    <TextInput
                                        //helperText="Experience should be a number"
                                        id="experience"
                                        invalidText={this.state.experienceError}
                                        labelText="Experience"
                                        placeholder="Enter years of experience"
                                        name='experience'
                                        value={this.state.experience}
                                        onChange={this.changeHandler}
                                        invalid={this.state.invalidExperience}
                                        inline
                                    />
                                
                    
                            </Column>
                            
                        </Row>
                        <br/>
                        <Row>
                            <Column sm={3} md={5} lg={4}>
                                
                
                                    <TextInput
                                        //helperText="Income should be a number"
                                        id="income"
                                        invalidText={this.state.incomeError}
                                        labelText="Annual Income"
                                        placeholder="Enter annual Income "
                                        name='income'
                                        value={this.state.income}
                                        onChange={this.changeHandler}
                                        invalid={this.state.invalidIncome}
                                        inline
                                    />
                                
                    
                            </Column>
                            
                        </Row>
                        <br/>
                        <Row>
                            <Column sm={3} md={5} lg={4}>
                                
                
                                    <TextInput
                                        //helperText="This should be a 6 digit home address zip code"
                                        id="zipcode"
                                        invalidText={this.state.ZipcodeError}
                                        labelText="ZipCode"
                                        placeholder="Enter Zip code"
                                        name='Zipcode'
                                        value={this.state.Zipcode}
                                        onChange={this.changeHandler}
                                        invalid={this.state.invalidZipcode}
                                        inline
                                    />
                                
                    
                            </Column>
                            
                        </Row>

                        <br/>
                        <Row>
                            <Column sm={3} md={5} lg={4}>
                                
                
                                    <TextInput
                                        //helperText="This should be a number"
                                        id="family"
                                        invalidText={this.state.familyError}
                                        labelText="Family Size"
                                        placeholder="Enter family size"
                                        name='familySize'
                                        value={this.state.familySize}
                                        onChange={this.changeHandler}
                                        invalid={this.state.invalidFamilySize}
                                        inline
                                    />
                                
                    
                            </Column>
                            
                        </Row>
                        <br/>
                        <Row>

                            <Column sm={1} md={5} lg={4} style={{marginLeft:'1rem'}}>
                                <FormGroup legendText="Education" onChange={this.onChangeEducation} value={this.state.education} style={{textAlign:'left'}}>
                                    <RadioButtonGroup
                                        //defaultSelected="No"
                                        // legend="Group Legend"
                                        // name="radio-button-group"
            
                                        labelPosition='right' 
                                        orientation='horizontal'
     
                                    >
                                    <RadioButton
                                        id="undergrad"
                                        labelText="Under-Graduate"
                                        value="1"
                                        name='education'
                                    />
                                    
                                    <RadioButton
                                        id="graduate"
                                        labelText="Graduate"
                                        value="2"
                                        name='education'
                                    />
                                    <RadioButton
                                        id="advanced"
                                        labelText="Advanced/Professional"
                                        value="3"
                                        name='education'
        
                                    />
                                    </RadioButtonGroup>
       
     
                                </FormGroup>
                            </Column>
                            
                        </Row>
                        <br/>
                        <br/>
                        <Row>
                          <Column sm={3} md={5} lg={4}>
                            <h5 style={{float:'left',marginLeft:'1rem'}}>
                              2. Loan Information
                              <Tooltip
                                direction="right"
                                tabIndex={0}
                               //triggerText="Tooltip label"
                              >
                              <p>
                                  We use this information to process your eligibility for taking loan.Kindly provide correct details.</p>
      
                              </Tooltip>
                              </h5>
                            <br/>
                          </Column>
                            <br/>
                        </Row>
                    <br/>
                        <Row>
                            <Column sm={3} md={5} lg={4}>
                                
                
                                    <TextInput
                                        //helperText="Fill in the average spending of credit card per month"
                                        id="ccavg"
                                        invalidText={this.state.CcavgError}
                                        labelText="Ccavg"
                                        placeholder="Enter Ccavg"
                                        name='Ccavg'
                                        value={this.state.Ccavg}
                                        onChange={this.changeHandler}
                                        invalid={this.state.invalidCcavg}
                                        inline
                                    />
                                
                    
                            </Column>
                            
                        </Row>
                        <br/>
                        
                        <Row>
                            <Column sm={3} md={5} lg={4}>
                                
                
                                    <TextInput
                                       // helperText="Fill in the value of house mortgage"
                                        id="mortgage"
                                        invalidText={this.state.mortgageError}
                                        labelText="Mortgage"
                                        placeholder="Enter Mortgage vale"
                                        name='mortgage'
                                        value={this.state.mortgage}
                                        onChange={this.changeHandler}
                                        invalid={this.state.invalidMortgage}
                                        inline
                                    />
                                
                    
                            </Column>
                            
                        </Row>
                        <br/>
                        <br/> 
                        <Row>
                        <Column sm={1} md={3} lg={5} style={{marginLeft:'1rem'}}>
                                <FormGroup legendText="Security Account" onChange={this.onChangeSecurityAccount} value={this.state.security_account} style={{textAlign:'left'}}>
                                    <RadioButtonGroup
                                        //defaultSelected="No"
                                        // legend="Group Legend"
                                        // name="radio-button-group"
                                        
                                        labelPosition='right' 
                                        orientation='horizontal'
                                        
                                    >
                                    <RadioButton
                                        id="security-1"
                                        labelText="Yes"
                                        value="1"
                                        name='security_account'
                                    />
                                    <RadioButton
                                        id="security-0"
                                        labelText="No"
                                        value="0"
                                        name='security_account'
                                    />
                                    
                                    </RadioButtonGroup>
       
     
                                </FormGroup>
                            </Column>
                            <Column sm={1} md={5} lg={4} style={{marginLeft:'1rem'}}>
                          
                              <FormGroup legendText="CD Account" onChange={this.onChangeCdAccount} value={this.state.CdAccount} style={{textAlign:'left'}}>
                                  <RadioButtonGroup
                                        //defaultSelected="No"
                                        // legend="Group Legend"
                                        // name="radio-button-group"
                                        
                                        labelPosition='right' 
                                        orientation='horizontal'
     
                                  >
                                  <RadioButton
                                        id="cd-yes"
                                        labelText="Yes"
                                        value="1"
                                        name='CdAccount'
                                  />
                                  <RadioButton
                                        id="cd-no"
                                        labelText="No"
                                        value="0"
                                        name='CdAccount'
                                  />

                                  </RadioButtonGroup>
                              </FormGroup>
                          </Column>
                            
                        </Row>

                        <br/>
                        <Row>
                        <Column sm={1} md={3} lg={5} style={{marginLeft:'1rem'}}>
                                <FormGroup legendText="Online" onChange={this.onChangeOnline} value={this.state.online} style={{textAlign:'left'}}>
                                    <RadioButtonGroup
                                        //defaultSelected="No"
                                        // legend="Group Legend"
                                        // name="radio-button-group"
                                        
                                        labelPosition='right' 
                                        orientation='horizontal'
     
                                    >
                                    <RadioButton
                                        id="online-1"
                                        labelText="Yes"
                                        value="1"
                                        name='online'
        
                                    />
                                    <RadioButton
                                        id="online-0"
                                        labelText="No"
                                        value="0"
                                        name='online'
                                    />
                                  </RadioButtonGroup>
       
     
                                </FormGroup>
                            </Column>
                            <Column sm={1} md={5} lg={4} style={{marginLeft:'1rem'}}>
                                <FormGroup legendText="Credit Card" onChange={this.onChangeCreditCard} value={this.state.credit_card} style={{textAlign:'left'}}>
                                    <RadioButtonGroup
                                        //defaultSelected="No"
                                        // // legend="Group Legend"
                                        // // name="radio-button-group"
                                        // valueSelected='No'
                                        labelPosition='right' 
                                        orientation='horizontal'
     
                                    >
                                    <RadioButton
                                        id="credit-1"
                                        labelText="Yes"
                                        value="1"
                                        name='credit_card'
        
                                    />
                                    <RadioButton
                                        id="credit-0"
                                        labelText="No"
                                        value="0"
                                        name='credit_card'
                                    />
                                    
                                    </RadioButtonGroup>
       
     
                                </FormGroup>
                            </Column>
                            
                        </Row>
                        <br/>
                      
                        
                        <Row>
                                <Column sm={1} md={1} lg={1} style={{marginLeft:'1rem',marginBottom:'6rem'}}>
                                <Button kind ='tertiary' type="submit">Submit</Button>
                                </Column>
                            </Row>            
                    </Grid>
                    
            </Form>
          </div>
              ):
              (
                ''
              )
            }
            {
              (this.state.LoanResponse=='loan approved' && this.state.isSubmitted=='yes')?
                (
                  <div>
                  
                  <div className='tilePlacement2' >
                    <Grid>
                      <Row>
                        <Column >
                          
                          <center>
                            <div class="alert alert-success" role="alert" > 
                              <h4 class="alert-heading">Congratulations!</h4>
                              <span style={{fontSize:'40px'}}>&#10003;</span>
                              <p>Your loan has been successfully approved</p>
                              <hr></hr>
                              <p class="mb-0">Thanking for using our site</p>
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
              (this.state.LoanResponse=='loan denied' && this.state.isSubmitted=='yes')?
                (
                  <div>
                  
                  <div className='tilePlacement2' >
                    <Grid>
                      <Row>
                        <Column >
                          
                          <center>
                            <div class="alert alert-danger" role="alert" > 
                              <h4 class="alert-heading">Sorry!</h4>
                              <span style={{fontSize:'40px'}}>&#10007;</span>
                              <p> Your loan has been denied. Better luck next time.</p>
                              <hr></hr>
                              <p class="mb-0">Thanking for using our site</p>
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
export default NewForm;