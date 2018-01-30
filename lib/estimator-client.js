// (function() {
    
// function getEstimate(req,res) {
     var webdriver = require('selenium-webdriver'); 
    // var By = webdriver.By;
    const {Builder, By, promise, until} = require('selenium-webdriver');

module.exports = {


getEstimate: () => {


        var driver = new webdriver.Builder()
            .forBrowser('phantomjs')
            .build();
        driver.get('https://estimator.deancare.com/');
            
        //First Page
        //enter group number
            driver.findElement(By.xpath("//input[@id='mainContent_groupNumberTextBox']")).sendKeys("11015MB");
            
            //re-enter the group number
            driver.findElement(By.xpath("//input[@id='mainContent_groupNumberConfirmTextBox']")).sendKeys("11015MB");
    
            //Click Continue
            driver.findElement(By.xpath("//input[@id='mainContent_loginButton']")).click();
            
            //Second Page
            //Enter Location
            driver.findElement(By.xpath("//select[@id='mainContent_locationDropDown']")).sendKeys('10TH STREET COOPERATIVE TREATMENT');
    
            // //If needed, Enter Practitioner
            // if (Practitioner != null && !Practitioner.isEmpty()){
            // 	driver.findElement(By.xpath("//select[@name='ctl00$mainContent$practitionerDropDown']")).sendKeys('GERALD ADAMS, OD');			
            // }
            
                    //Enter CPT Code
            driver.findElement(By.xpath("//input[@id='mainContent_cptTextBox']")).sendKeys('64405');
            
            //Enter Date of Service (should be today + 30)
            driver.findElement(By.xpath("//input[@class='datepicker hasDatepicker']")).sendKeys('12/20/2017');
            
            //click "get estimate"
            driver.findElement(By.xpath("//input[@id='mainContent_getEstimateButton']")).click();
            
            allowedAmt = driver.findElement(By.xpath("//span[@id='mainContent_estimatedAllowedAmountLabel']")).getText()
            
  
        
            return allowedAmt
            .then( allowedAmt => {
                console.log("backend estimator function returned " + allowedAmt)
                return allowedAmt;
                }, error => {
                reject(error);
                });
        driver.quit();
            },

            
getEstimateJson: (data) => {
    console.log("*****************************************************");        
    console.log(data.group);
    console.log(data.location);
    console.log(data.cptCode);
    console.log(data.procedureDate);
            //json = JSON.parse(data);
            
            //console.log(json);
            var driver = new webdriver.Builder()
                .forBrowser('phantomjs')
                .build();
            driver.get('https://estimator.deancare.com/');
                
            //First Page
            //enter group number
                driver.findElement(By.xpath("//input[@id='mainContent_groupNumberTextBox']")).sendKeys(data.group);
                
                //re-enter the group number
                driver.findElement(By.xpath("//input[@id='mainContent_groupNumberConfirmTextBox']")).sendKeys(data.group);
        
                //Click Continue
                driver.findElement(By.xpath("//input[@id='mainContent_loginButton']")).click();
                
                //Second Page
                //Enter Location
                driver.findElement(By.xpath("//select[@id='mainContent_locationDropDown']")).sendKeys(data.location);
        
                // //If needed, Enter Practitioner
                // if (Practitioner != null && !Practitioner.isEmpty()){
                // 	driver.findElement(By.xpath("//select[@name='ctl00$mainContent$practitionerDropDown']")).sendKeys('GERALD ADAMS, OD');			
                // }
                
                        //Enter CPT Code
                driver.findElement(By.xpath("//input[@id='mainContent_cptTextBox']")).sendKeys(data.cptCode);
                
                //Enter Date of Service (should be today + 30)
                driver.findElement(By.xpath("//input[@class='datepicker hasDatepicker']")).sendKeys(data.procedureDate);
                
                //click "get estimate"
                driver.findElement(By.xpath("//input[@id='mainContent_getEstimateButton']")).click();
                
                allowedAmt = driver.findElement(By.xpath("//span[@id='mainContent_estimatedAllowedAmountLabel']")).getText()
                
      
            
                return allowedAmt
                .then( allowedAmt => {
                    console.log("backend estimator function returned " + allowedAmt)
                    return allowedAmt;
                    }, error => {
                    reject(error);
                    });
            driver.quit();
        }

        };
