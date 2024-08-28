import React from 'react';
import '../../styles/library/secondtri.css';

const FirstTri = () => {
  return (
    <div>
      <h1 className="title">Second Trimester</h1>
      <div className="image-container"style={{ height: '600px', top: '10px' }} > 
        <img src="img/bg2.jpg" alt="Second Trimester" className="secondtri-image" />
      </div>
      <div className="second-trimester-container">
        <div className="section">
          <h2>Embrace the beginnings: Navigating the nuanced path of pregnancy's early stages, one trimester at a time.</h2>
          <hr />
          <p>
    The first trimester of pregnancy is a crucial period that spans from
    week 1 to week 12 of your pregnancy. It begins on the first day of
    your last menstrual period and lasts until the end of week 12.
  </p>
  <br></br>
  <p>
    During these initial weeks, your body undergoes significant changes as
    it prepares to support the developing embryo. The first trimester is
    characterized by rapid fetal development, including the formation of
    major organs and body systems. By the end of the first trimester, the
    fetus will have grown from a single cell to a recognizable human form,
    with visible limbs, facial features, and internal organs.
  </p>
  <br></br>
  <p>
    Along with fetal development, the first trimester is also a time of
    profound changes for the mother. Hormonal fluctuations can lead to
    various symptoms, such as morning sickness, fatigue, and mood swings.
    Additionally, the first trimester is when many women experience the
    initial signs of pregnancy, including missed periods and positive
    pregnancy tests.
  </p>
  <br></br>
  <p>
    It's essential to take good care of yourself during the first trimester
    to support a healthy pregnancy. This includes maintaining a balanced
    diet, staying hydrated, getting plenty of rest, and attending regular
    prenatal checkups with your healthcare provider. By prioritizing your
    health and well-being during this critical period, you can help ensure
    the best possible outcomes for both you and your baby.
  </p>
        </div>

        <div className="section">
          <h2>Symptoms of First Trimester</h2>
          <p>
            During the first trimester, your body undergoes significant changes
            as it adjusts to the growing fetus. Some common symptoms experienced
            during this period include:
          </p>
          <br></br>
          <ul>
            <li>● Morning Sickness: Nausea and vomiting, often occurring in the morning but can happen at any time of the day.</li>
            <li>● Fatigue: Feeling extremely tired, which is a common symptom due to hormonal changes and increased metabolic demands.</li>
            <li>● Increased Urination: The uterus pressing on the bladder leads to frequent urination.</li>
            <li>● Tender Breasts: Hormonal changes cause breast tenderness and swelling.</li>
            <li>● Food Aversions and Cravings: Changes in hormone levels can alter your sense of taste and smell, leading to food aversions.</li>
            <li>● Mood Swings: Fluctuating hormone levels can impact mood and emotional well-being.</li>
            <li>● Constipation: Slower digestion and increased progesterone levels can lead to constipation.</li>
          </ul>
        </div>

        <div className="section">
        <div class="tagline-container">
            <div class="tagline-content">
                 <h2>Sculpting Motherhood: Exercise Your Way 
        <br></br>to a Balanced Pregnancy.</h2>
            </div>
        </div>

          <p>
            Regular exercise during pregnancy can help improve mood, reduce
            discomfort, and prepare your body for childbirth. However, it's
            essential to consult with your healthcare provider before starting
            any exercise routine. Some safe and beneficial exercises during the
            first trimester include:
          </p>
          <br></br>
          <ul>
            <li>Walking: A low-impact exercise that helps improve circulation, strengthen the heart, and maintain a healthy weight.</li>
            <li>Swimming: Provides a full-body workout while being gentle on the joints and supporting the weight of the belly.</li>
            <li>Prenatal Yoga: Helps improve flexibility, strength, and relaxation through gentle stretching and breathing exercises.</li>
            <li>Low-Impact Aerobics: Cardiovascular exercises or using an elliptical machine can boost energy and improve endurance.</li>
          </ul>
          <br></br>
          <br></br>
          <br></br>
          <p>
            It's essential to listen to your body and avoid activities that cause
            discomfort or strain. Remember to stay hydrated, wear comfortable
            clothing, and avoid overheating during exercise.
          </p>
        </div>
        <div className="section">
          <img src="img/bg2.jpg" alt="Description of the image" />
        </div>
        <div className="section">
          <h2>First Trimester Checklist</h2>
          <ul className="checklist">
            <li>Schedule your first prenatal appointment with your healthcare provider.</li>
            <li>Start taking prenatal vitamins containing folic acid.</li>
            <li>Eat a healthy and balanced diet rich in fruits, vegetables, whole grains, and lean proteins.</li>
            <li>Avoid alcohol, smoking, and recreational drugs.</li>
            <li>Stay hydrated by drinking plenty of water throughout the day.</li>
            <li>Get plenty of rest and prioritize sleep.</li>
            <li>Avoid strenuous physical activities and contact sports.</li>
            <li>Practice stress-reducing techniques such as deep breathing, meditation, or prenatal yoga.</li>
          </ul>
        </div>


        <div className="section">
        <h2 className="related-articles">Related Articles</h2>
  <div className="article-boxes">
    {/* First article box */}
    <div className="article-box">
    <img src="img/bg2.jpg" alt="Article Image" />
        <h3>Article Title</h3>
            <p>Article summary or excerpt goes here...</p>
            <a href="#">Read more</a>
    </div>
    
    {/* Second article box */}
    <div className="article-box">
    <img src="img/bg2.jpg" alt="Article Image" />
        <h3>Article Title</h3>
            <p>Article summary or excerpt goes here...</p>
            <a href="#">Read more</a>
    </div>
    
    {/* Third article box */}
    <div className="article-box">
    <img src="img/bg2.jpg" alt="Article Image" />
        <h3>Article Title</h3>
            <p>Article summary or excerpt goes here...</p>
            <a href="#">Read more</a>
    </div>
  </div>
</div>
      </div>
    </div>
  );
};

export default FirstTri;
