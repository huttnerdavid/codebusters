import React from 'react';
import HomePageImage from '../../Image/HomePageImage.jpg';
import { HomePageWrapper, ImageWrapper, Image, Text, TextWrapper, A } from '../../Styles/HomePage.Styled';

const HomePage = () => {
  return (
    <section id="header2-1">
      <HomePageWrapper>
        <ImageWrapper>
          <Image src={HomePageImage} alt=""/>
        </ImageWrapper>
        <div>
          <h1 className="mbr-section-title mbr-fonts-style display-1">Business Consulting</h1>
          <div className="text-wrapper">
            <TextWrapper>
              <Text className="mbr-text mbr-fonts-style display-7 fs-6">
                At Codebusters, we pioneer excellence in construction management with our cutting-edge application.<br/>
                We empower project teams to streamline workflows, enhance collaboration, and optimize project outcomes.<br/>
                Our robust platform leverages advanced technology to deliver real-time insights,<br/>
                ensuring efficient project planning, resource allocation, and task monitoring.<br/>
                With a commitment to innovation, we redefine construction management by providing a user-friendly<br/>
                solution that integrates seamlessly into the construction lifecycle,<br/>
                ultimately driving success for our clients and transforming the way construction projects are managed.
                <div style={{textAlign: "center"}}>
                  <A className="btn btn-info display-4" href="/contact">
                    <span className="mobi-mbri mobi-mbri-arrow-next mbr-iconfont mbr-iconfont-btn"></span>Contact us!
                  </A>
                </div>
              </Text>
            </TextWrapper>
          </div>
        </div>
      </HomePageWrapper>
    </section>
  )
}

export default HomePage
