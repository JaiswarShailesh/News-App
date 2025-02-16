import React, { useState } from "react";
import { Nav, Container } from "react-bootstrap";
import HomePageNews from "./homePageNews";

const Home = ({ selectedLanguage }) => {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <Container>
      <Nav
        className="d-flex justify-content-between mt-2"
        variant="underline"
        activeKey={activeTab}
        onSelect={(selectedKey) => setActiveTab(selectedKey)}
      >
        <Nav.Item>
          <Nav.Link eventKey="general">
            Latest
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="business">Business</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="entertainment">Entertainment</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="sports">Sports</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="health">Health</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="science">Science</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="technology">Technology</Nav.Link>
        </Nav.Item>
      </Nav>

      <div className="my-2">
        {activeTab === "general" && (
          <HomePageNews
            categorName="general"
            selectedLanguage={selectedLanguage}
          />
        )}
        {activeTab === "business" && (
          <HomePageNews
            categorName="business"
            selectedLanguage={selectedLanguage}
          />
        )}
        {activeTab === "entertainment" && (
          <HomePageNews
            categorName="entertainment"
            selectedLanguage={selectedLanguage}
          />
        )}
        {activeTab === "sports" && (
          <HomePageNews
            categorName="sports"
            selectedLanguage={selectedLanguage}
          />
        )}
        {activeTab === "health" && (
          <HomePageNews
            categorName="health"
            selectedLanguage={selectedLanguage}
          />
        )}
        {activeTab === "science" && (
          <HomePageNews
            categorName="science"
            selectedLanguage={selectedLanguage}
          />
        )}
        {activeTab === "technology" && (
          <HomePageNews
            categorName="technology"
            selectedLanguage={selectedLanguage}
          />
        )}
      </div>
    </Container>
  );
};

export default Home;
