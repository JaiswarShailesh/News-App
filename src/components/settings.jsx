// import React, { useState } from "react";
import { Accordion, Container, Form, Row } from "react-bootstrap";
import { ThemeContext } from "./themeContext";
import { useContext } from "react";

const Settings = ({ selectedLanguage, setSelectedLanguage }) => {
  const languages = [
    { name: "Arabic", code: "ar" },
    { name: "German", code: "de" },
    { name: "English", code: "en" },
    { name: "Spanish", code: "es" },
    { name: "French", code: "fr" },
    { name: "Hebrew", code: "he" },
    { name: "Italian", code: "it" },
    { name: "Dutch", code: "nl" },
    { name: "Norwegian", code: "no" },
    { name: "Portuguese", code: "pt" },
    { name: "Russian", code: "ru" },
    { name: "Swedish", code: "sv" },
    { name: "Chinese", code: "zh" },
  ];

  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Container>
      <Row>
        <h2 className="my-3">Settings</h2>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Change Language</Accordion.Header>
            <Accordion.Body>
              <Form>
                {languages.map((language, index) => (
                  <Form.Check
                    inline
                    label={language.name}
                    name="group1"
                    type="radio"
                    id={`language-${index}`}
                    key={index}
                    value={language.code}
                    checked={selectedLanguage === language.code}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                  />
                ))}
              </Form>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Change Theme</Accordion.Header>
            <Accordion.Body>
              <Form>
                <Form.Check
                  inline
                  name="themeGroup"
                  type="radio"
                  label="Light"
                  id="theme-light"
                  checked={theme === "light"}
                  onChange={() => toggleTheme("light")}
                />
                <Form.Check
                  inline
                  name="themeGroup"
                  type="radio"
                  label="Dark"
                  id="theme-dark"
                  checked={theme === "dark"}
                  onChange={() => toggleTheme("dark")}
                />
              </Form>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Row>
    </Container>
  );
};

export default Settings;
