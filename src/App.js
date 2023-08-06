import React, { useEffect, useState } from "react";
import "./App.css";
import arcade from "./assets/images/icon-arcade.svg";
import advance from "./assets/images/icon-advanced.svg";
import pro from "./assets/images/icon-pro.svg";

function App() {
  const [changepage, setChangePage] = useState(""); // Changed the state variable name to setChangePage
  const [button, setButton] = useState("Next Step");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectads, setSelectads] = useState(null);

  const handlePlanClick = (planData) => {
    setSelectedPlan(planData);
  };
  const handleAdsClick = (adData) => {
    setSelectads( adData );
  };
  const changeEvent = (item) => {
    setChangePage(item); // Set the state to the value of 'item'
  };
  const nextStep = () => {
    if (changepage === "info" || changepage === "") {
      setChangePage("plan");
    } else if (changepage === "plan") {
      setChangePage("ads");
    } else {
      setChangePage("summary");
    }
  };

  const changePlan = () => {
    setChangePage('plan');
  }

  const GoBack = () => {
   if (changepage === "summary") {
      setChangePage("ads");
    } else if(changepage === "ads") {
      setChangePage('plan')
    }
    else {
      setChangePage("info");
    }
  }

  useEffect(
    function () {
      if (changepage === "summary") {
        setButton("Submit");
      } else {
        setButton("Next Step");
      }
    },
    [changepage]
  );


  let content = null;
  if (changepage === "" || changepage === "info") {
    content = (
      <div className="info">
        <h1>Personal Information</h1>
        <p>Please provide your Name,email, and Phone Number.</p>

        <div className="formInfo">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" placeholder="John Khan" />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            required
            placeholder="khan@email.com"
          />

          <label htmlFor="number">Number</label>
          <input type="text" name="number" id="" placeholder="e.g 0129329392" />
        </div>
      </div>
    );
  } else if (changepage === "plan") {
    content = (
      <div className="plan">
        <h1>Select Plan</h1>
        <p>You have option of Monthly, or Yearly billings.</p>
        <div className="planContent">
          <div
            onClick={() =>
              handlePlanClick({ title: "Arcade", price: 12 })
            }
          >
            <img src={arcade} alt="icon" />
            <h1>Arcade</h1>
            <p>12$/Month</p>
          </div>
          <div
            onClick={() =>
              handlePlanClick({ title: "Advance", price: 19 })
            }
          >
            <img src={advance} alt="" />
            <h1>Advance</h1>
            <p>19$/Month</p>
          </div>
          <div
            onClick={() =>
              handlePlanClick({ title: "Pro", price: 29 })
            }
          >
            <img src={pro} alt="" />
            <h1>Pro</h1>
            <p>29$/Month</p>
          </div>
        </div>
        {/* <button>yearly</button> */}
      </div>
    );
  } else if (changepage === "ads") {
    content = (
      <div className="ads">
        <h1>Pick Ads-ONs</h1>
        <p>Ads-on help enhance your gaming experince.</p>
        <div className="adsContent">
          <div className="sameForAll">
            <div>
              <input type="checkbox" name="service"  onClick={() =>
                  handleAdsClick({
                    ads: "Access to multiplayer games",
                    adsprice: 3,
                  })
                } />
              <label
                htmlFor="service"
               
              >
                Online Service
              </label>
              <p>Access to multiplayer games</p>
            </div>
            <h5>3$/Monthly</h5>
          </div>

          <div className="sameForAll">
            <div>
              <input type="checkbox" name="storage"  onClick={() =>
                  handleAdsClick({
                    ads: "Extra 1TB of cloud save",
                    adsprice: 5,
                  })
                }/>
              <label
                htmlFor="storage"
              >
                Larger Storage
              </label>
              <p>Extra 1TB of cloud save</p>
            </div>

            <h5>5$/Monthly</h5>
          </div>

          <div className="sameForAll">
            <div>
              <input type="checkbox" name="profile"  onClick={() =>
                  handleAdsClick({
                    ads: "Customize theme on your profile",
                    adsprice: 9,
                  })
                }/>
              <label htmlFor="profile">Customizable Profile</label>
              <p></p>
            </div>
            <h5>9$/Monthly</h5>
          </div>
        </div>
      </div>
    );
  } else { 
    if(!selectads  || !selectedPlan){
      content = (
        <div className="summary">
           <h1>Finishing up</h1>
          <p>Double check everything look ok before confirming.</p>
          <div>
            Please select a plan and if want any ads-on
          </div>
        </div>
      )
    }
    else{
      content = (
        <div className="summary">
          <h1>Finishing up</h1>
          <p>Double check everything look ok before confirming.</p>
          <div className="summaryContent">
            <div>
              <aside>
            <h2>{selectedPlan.title}</h2>
          <button onClick={changePlan}>change</button>
              </aside>
            
          <p>{selectedPlan.price}$/Month</p>
            </div>
            <hr />
            <div>
          <p>{selectads.ads}</p>
          <p>{selectads.adsprice}$/Month</p>
            </div>
          </div>
          <div className="totalprice">
          <p>Total/(per month)</p>
          <h1>+${selectedPlan.price + selectads.adsprice}/per month</h1>
          </div>
        </div>
      );
      
    }
  }

  const goback = (<button className="goBack" onClick={GoBack}>Go Back</button>)
  return (
    <div className="App">
      <section className="mainSection">
        <aside className="leftAside">
          <ol>
            {/* Changed the onClick handlers to use 'plan' and 'info' */}
            <li className="circle" onClick={() => changeEvent("info")}>
              <p>Step 1</p> Your Info
            </li>
            <li className="circle" onClick={() => changeEvent("plan")}>
              <p>Step 2</p>Select Plan
            </li>
            <li className="circle" onClick={() => changeEvent("ads")}>
              <p>Step 3</p>Ads-On
            </li>
            <li className="circle" onClick={() => changeEvent("summary")}>
              <p>Step 4</p>Summary
            </li>
          </ol>
        </aside>
        <aside className="rightAside">
          {content}
          <div className="btn">
          {changepage === 'info' ?<button className="nonebtn">None</button>   :goback }
          <button onClick={() => nextStep()}>{button}</button>
          </div>
        </aside>
      </section>
    </div>
  );
}

export default App;
