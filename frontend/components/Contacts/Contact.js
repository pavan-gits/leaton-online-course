import Link from "next/link";
import ContactData from "../../data/pages/contact.json";

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';



const Contact = () => {

  const [contactData, setContactData] = useState(null);
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    const fetchAccordionData = async (token) => {
      try {
        const response = await fetch('/api/contact_info/',
          {
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Token ${token}`
            }
          }
        ); // Replace with your API endpoint
        const data = await response.json();
        setContactData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchAccordionData(token);
  }, [token]);

  if (!contactData) {
    return "loading..."
  }
  
  return (
    <>
      <div className="row g-5">
        {contactData &&
          contactData.contactDetails.map((data, index) => (
            <div
              className="col-lg-4 col-md-6 col-sm-6 col-12 sal-animate"
              data-sal="slide-up"
              data-sal-delay="150"
              data-sal-duration="800"
              key={index}
            >
              <div className="rbt-address">
                <div className="icon">
                  <i className={data.icon}></i>
                </div>
                <div className="inner">
                  <h4 className="title">{data.title}</h4>
                  {data.numOne !== "" ? (
                    <p>
                      <Link href={data.numOne}>{data.numOne}</Link>
                    </p>
                  ) : (
                    ""
                  )}
                  {data.numTwo !== "" ? (
                    <p>
                      <Link href={data.numTwo}>{data.numTwo}</Link>
                    </p>
                  ) : (
                    ""
                  )}
                  {data.mailOne !== "" ? (
                    <p>
                      <Link href={`mailto:${data.mailOne}`}>
                        {data.mailOne}
                      </Link>
                    </p>
                  ) : (
                    ""
                  )}
                  {data.mailTwo !== "" ? (
                    <p>
                      <Link href={`mailto:${data.mailTwo}`}>
                        {data.mailTwo}
                      </Link>
                    </p>
                  ) : (
                    ""
                  )}
                  {data.address !== "" ? <p>{data.address}</p> : ""}
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Contact;
