import React from "react";
import { Link } from "gatsby";
import "./case-study-call.css";
import bluetoothSimulationImage from '../../img/case-study-cta.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
  return (
    <section className="case-study-call">
      <content>
        <h4 className="case-study-call--title">
          <Link to="/blog/2019-12-11-case-study-bluetooth-simulation/">
            <strong className="case-study-call--label">
              Case study
            </strong>
            Facilitating the next generation of Bluetooth-connected apps
          </Link>
        </h4>
        <p>
          Developing UIs for connected devices can be challenging. We devised a solution based on simulation, and partnered up with Open Source contributors to bring our client and the community a library built by the best team possible.
        </p>
        <Link className="case-study-call--link" to="/blog/2019-12-11-case-study-bluetooth-simulation/">
          Read more <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      </content>
      <aside>
        <img src={bluetoothSimulationImage} alt="Bluetooth simulation" />
      </aside>
    </section>
  );
}
