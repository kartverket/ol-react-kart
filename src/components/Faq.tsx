import { faAngleDown, faAngleLeft, faAngleRight, faAngleUp, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { generateFaqUrl } from '../utils/n3api';

export interface iFAQ {
  question: string;
  answer: string;
}

const Faq = () => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const [showAnswer, setShowAnswer] = useState<number>();
  const [faq, setFaq] = useState<iFAQ[]>([]);
  const { i18n } = useTranslation();

  useEffect(() => {
    const lang = i18n.resolvedLanguage;
    axios
      .get(generateFaqUrl(lang))
      .then(response => {
        setFaq(response.data);
      })
      .catch(error => {
        console.warn(error);
      });
  }, [i18n.resolvedLanguage]);

  const toggleShowAnswer = (index: number) => {
    setShowAnswer(showAnswer === index ? undefined : index);
  };

  return (
    <>
      <div
        className="d-flex expandBtn"
        onClick={() => {
          setShow(!show);
        }}
      >
        <div className="ps-2 pe-2">
          <FontAwesomeIcon icon={faQuestion} />{' '}
        </div>
        <div className="ps-2 pe-2">
          <span className="text-capitalize">{t('tips_og_triks')}</span>
        </div>
        <div className="ms-auto ps-2 pe-2">
          <FontAwesomeIcon icon={show ? faAngleLeft : faAngleRight} />
        </div>
      </div>
      {show && faq ? (
        <div className="expandContent">
          <div className="container">
            <ul className="list-group list-group-flush">
              {faq.map((aq, index) => (
                <li key={index} className="list-group-item px-0" onClick={() => toggleShowAnswer(index)}>
                  <div className="card-header px-1">
                    {aq.question}
                    <FontAwesomeIcon className="float-end" icon={show ? faAngleUp : faAngleDown} />
                  </div>
                  {showAnswer === index ? <div className="card-body">{aq.answer}</div> : null}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Faq;