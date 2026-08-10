/* eslint-disable max-lines */
import { Heading, Link } from '@radix-ui/themes'
import { Head } from 'features/head'
import { Suspense } from 'react'

// NOTE: copied from rollbit
// TODO: replace content with the original AML
export const AmlPolicyPage: React.FC = () => {
  return (
    <>
      <Head title='AmlPolicy' />
      <Suspense fallback={<p>Loading...</p>}>
        <Heading
          as='h1'
          size='8'
          mt='6'
        >
          AmlPolicy
        </Heading>
        <Heading as='h2'>Last updated: — </Heading>
        <Heading as='h3'>For Cash Deposits and Cash Withdrawals.</Heading>
        (AMLI Anti-Money-Laundering policy of{' '}
        <Link href='xyro.io'>xyro.io</Link>. Introduction:{' '}
        <Link href='xyro.io'>xyro.io</Link>
        is a brand name of Bull Gaming N.V., <Link href='xyro.io'>
          xyro.io
        </Link>{' '}
        is operated by Bull Gaming N.V. Bull Gaming, which has its office
        registered in Abraham de Veerstraat 9 in Curacao. Objective of the AML
        Policy: We seek to offer the highest security to all of our users and
        customers on <Link href='xyro.io'>xyro.io</Link>. For that, a three step
        account verification is done in order to ensure the identity of our
        customers. The reason behind this is to prove that the details of the
        person registered are correct and the deposit methods used are not
        stolen or being used by someone else, which is to create the general
        framework for the fight against money laundering. We also take into
        account that depending on the nationality and origin, the payment method
        and withdrawal method, different safety measurements must be taken.{' '}
        <Link href='xyro.io'>xyro.io</Link> also puts reasonable measures in
        place to control and limit ML risk, including dedicating the appropriate
        m <Link href='xyro.io'>xyro.io</Link> is committed to high standards of
        anti-money laundering (AML) according to the EU guidelines, compliance,
        and requires management & employees to enforce these standards in
        preventing the use of its services for money laundering purposes. The
        AML program of <Link href='xyro.io'>xyro.io</Link> is designed to be
        compliant with: EU: “Directive 2015/849 of the European Parliament and
        of The Council of 20 May 2015 on the prevention of the use of the
        financial system for the purposes of money laundering” EU: “Regulation
        2015/847 on information accompanying transfers of funds” EU: Various
        regulations imposing sanctions or restrictive measures against persons
        and embargo on certain goods and technology, including all dual-use
        goods BE: “Law of 18 September 2017 on the prevention of money
        laundering limitation of the use of cash
        <Heading as='h5'>Definition of money laundering:</Heading>
        <li>Money Laundering is understood as: </li>
        <li>
          The conversion or transfer of property, especially money, knowing that
          such property is derived from criminal activity or from taking part in
          such activity, for the purpose of concealing or disguising the illegal
          origin of the property or of helping any person who is involved in the
          commission of such an activity to evade the legal consequences of that
          person&apos;s or companies action;{' '}
        </li>
        <li>
          The concealment or disguise of the true nature, source, location,
          disposition, movement, rights with respect to, or ownership of,
          property, knowing that such property is derived from criminal activity
          or from an act of participation in such an activity;
        </li>
        <li>
          The acquisition, possession or use of property, knowing, at the time
          of receipt, that such property was derived from criminal activity or
          from assisting in such an activity;{' '}
        </li>
        <li>
          Participation in, association to commit, attempts to commit and
          aiding, abetting, facilitating and counselling the commission of any
          of the actions referred to in points before.{' '}
        </li>
        Money laundering shall be regarded as such even when the activities
        which generated the property to be laundered were carried out in the
        territory of another Member State or in that of a third country.
        Organization of the AML for <Link href='xyro.io'>xyro.io</Link>: In
        accordance with the AML legislation, <Link href='xyro.io'>xyro.io</Link>{' '}
        has appointed the “highest level” for the prevention of ML: The full
        management of Bull Gaming N.V. is in charge. AML policy changes and
        implementation requirements: Each major change of{' '}
        <Link href='xyro.io'>xyro.io</Link> AML policy is subject to be approval
        by the general management of Bull Gaming N.V. Three-step Verification:
        Step one verification: Every user and customer may be required to
        complete step one verification to withdraw. Regardless of the choice of
        payment, the payment amount, the withdrawal amount and nationality of
        the user/customer, step one verification may be required to be done
        first. Step one verification is a document that may be required to be
        filled out by the user/customer themselves. The following information
        may be required to be filled in: first name, second name, date of birth,
        country of usual residence, gender and full address. Step two
        verification: Step two verification may be required to be done by every
        user which deposits over $2,000 (two thousand US Dollars), withdraws
        over $2,000 (two thousand US Dollars), or sends another user over $1,000
        (one thousand US Dollars). Until step two verification is completed, the
        withdrawal, tip or deposit may be held. Step two verification may lead
        the user or customer to a sub-page where they may be required to send
        their ID. The user/customer may be required to take a picture of their
        ID next to a piece of paper with a six-digit, randomly generated number.
        Only an official ID may be used for ID verification, depending on the
        country, the variety of accepted IDs may be different. There may also be
        an electronic check to see if the data inputted from the step one
        verification is correct. The electronic check is done via two different
        data banks to ensure the given information matches with the document
        provided and the name from the ID. If the electronic test fails or is
        not possible, the user/customer is required to send in a confirmation of
        their current residence. A certificate of registration by the government
        or a similar document is required. Step three verification: Step three
        verification may be required to be done by every user who deposits over
        $5,000 (five thousand US Dollars), withdraws over $5,000 (five thousand
        US Dollars), or sends another user over $3,000 (three thousand US
        Dollars). Until step three verification is done, the withdraw, tip or
        deposit may be held. For step three, a user/customer may be asked for a
        source of wealth.
        <Heading as='h5'>
          Customer identification and verification (KYC){' '}
        </Heading>
        The formal identification of customers on entry into commercial
        relations is a vital element, both for the regulations relating to money
        laundering and for the KYC policy. This identification relies on the
        following fundamental principles: A copy of your passport, ID card or
        driving license, each shown alongside a handwritten note displaying six,
        randomly generated numbers. Also, a second picture with the face of the
        user/customer is required. The user/customer may blur out information to
        secure their privacy, besides date of birth, nationality, gender, first
        name, second name and the picture. Please note that all four corners of
        the ID must be visible in the same image and all details must be clearly
        readable besides the information mentioned above. We might ask for all
        details if necessary. An employee may do additional checks if necessary,
        based on the situation.
        <Heading as='h5'>Proof of Address:</Heading>
        Proof of address may be carried out via different electronic checks
        using two different databases. If an electronic test fails, the
        user/customer has the option to provide proof manually. A recent utility
        bill sent to your registered address, issued within the last three
        months, or an official document from the government that proves your
        state of residence. To make the approval process as speedy as possible,
        please make sure the document is sent with a clear resolution where all
        four corners of the document are visible, and all text is readable. For
        example: An electricity bill, water bill, bank statement or any
        governmental correspondence addressed to you. An employee may do
        additional checks if necessary, based on the situation.
        <Heading as='h5'>Source of funds </Heading>
        If a player deposits over five thousand euros, there is a process in
        place to understand the source of wealth (SOW). Examples of SOW are:
        <li>Ownership of a business</li>
        <li>Employment </li>
        <li>Inheritance </li>
        <li>Investment </li>
        <li>Family</li>
        It is critical that the origin and legitimacy of that wealth is clearly
        understood. If this is not possible an employee may ask for an
        additional document or prove. The account may be frozen if the same user
        deposits either this amount in one go or multiple transactions which
        amount to this. An email will be sent to them manually to go through the
        above, and information on the website itself.{' '}
        <Link href='xyro.io'>xyro.io</Link> also asks for a bank wire/credit
        card to further insure the Identity of the user/customer. It also gives
        additional information about the financial situation of the
        user/customer. Basic document for step one: The basic document will be
        accessible via the setting page on <Link href='xyro.io'>xyro.io</Link>.
        Every user may be required to fill out the following information:
        <li>First name </li>
        <li>Second name</li>
        <li>Nationality </li>
        <li>Gender </li>
        <li>Date of Birth </li>
        The document will be saved and checked by an AI, and an employee may do
        additional checks if necessary based on the situation.
        <Heading as='h5'>
          Sanctions, Persons and Entities of Special Interest as well as PEPS.{' '}
        </Heading>
        The www.opensanctions.org database is used for screenings of open
        sanctions. The website is a global database of persons and companies of
        political, criminal, or economic interest. It combines the most
        important sanctions lists, databases of politically exposed persons and
        other public information into a single easy-to-access dataset. It
        Cross-checks leaks and public databases for possible conflicts of
        interests and signs of illicit activity, it tracks political conflicts,
        compares world-wide sanctions policies and checks potential customers
        and partners in international dealings. The project includes sanctions
        lists, lists of politicians, ban lists used in government procurement,
        lists of known terrorists and other data sources relevant to
        journalistic research and due diligence. In order to facilitate the use
        of this database <Link href='xyro.io'>xyro.io</Link> has created a
        script that incorporates the OpenSanctions search engine on the website.
        The user will sign up and may be required to add his/her name, address
        and email address. Before they move onto the next stage of checks, a
        script extracts their name and scans this through the database to ensure
        that they are not a listed person. If the results come back negative,
        the customer may not be able to enter the site and we may inform
        authorities. <Link href='xyro.io'>xyro.io</Link> may also have a
        subscription to namescan.io
        <Heading as='h5'>Risk management: </Heading>
        In order to deal with the different risks and different states of wealth
        in different regions on the e <Link href='xyro.io'>xyro.io</Link> may
        categorize every nation in three different regions of risk. Region one:
        Low risk: For every nation from the region one, the three-step
        verification is done as described earlier. Region two: Medium risk: For
        every nation from the region two, the three-step verification may be
        done at lower deposit, withdrawal and tip amounts. Step one may be done
        as usually. Step two may be done after depositing $1,000 (one thousand
        US Dollars), withdrawing $1,000 (one thousand US Dollars) or tipping
        another user/customer $500 (five hundred US Dollars). Step three may be
        done after depositing $2,500 (two thousand five hundred US Dollars),
        withdrawing $2,500 (two thousand five hundred US Dollars) or tipping
        another user/customer $1,000 (one thousand US Dollars). Also, users from
        a low-risk region that exchanges cryptocurrency with any other currency
        may be treated like user/customers from a medium-risk region. Region
        three: High risk: Regions of high risks may be banned. High-risk regions
        will be regularly updated to keep up with the changing environment of a
        fast-changing world. Additional measurements. In addition, an AI which
        is overseen by the AML compliance officer, who will look for any unusual
        behaviour and report it right away to an employee of{' '}
        <Link href='xyro.io'>xyro.io</Link>. According to a risk based few and
        general experience the human employees may recheck all checks which are
        done by the AI or other employees and may redo or do additional checks
        according to the situation. In addition, a data scientist supported by
        modern, electronic, analytic systems will look for unusual behaviours
        like: depositing and withdrawing without longer betting sessions,
        attempts to use a different bank account to deposit and withdraw,
        nationality changes, currency changes, behaviour and activity changes,
        as well as if an account is used by it´s original owner. Also, a User
        has to use the same method for withdrawals as they used for deposits,
        for the amount of the initial Deposit to prevent any Money Laundering.
        Enterprise-wide risk assessment As part of its risk-based appr{' '}
        <Link href='xyro.io'>xyro.io</Link> has conducted an AML
        “Enterprise-wide risk assessment” (EWRA) to identify and understand
        risks specific to <Link href='xyro.io'>xyro.io</Link> and its business
        lines. The AML risk policy is determined after identifying and
        documenting the risks inherent to its business lines, such as the
        services the website offers. The Users to whom services are offered,
        transactions performed by these Users, delivery channels used by the
        bank, the geographic locations of the bank’s operations, customers and
        transactions and other qualitative and emerging risks. The
        identification of AML risk categories is based on the understanding of
        regulatory requirements by <Link href='xyro.io'>xyro.io</Link>,
        regulatory expectations and industry guidance. Additional safety
        measures are taken to take care of the additional risks the world wide
        web brings with it. The EWRA is yearly reassessed.
        <Heading as='h5'>Ongoing transaction monitoring</Heading>
        AML-Compliance ensures that an “ongoing transaction monitoring” is
        conducted to detect transactions which are unusual or suspicious
        compared to the customer profile. This transaction monitoring is
        conducted on two levels: 1) The first Line of Control:{' '}
        <Link href='xyro.io'>xyro.io</Link> works solely with trusted Payment
        Service Providers whom all have effective AML policies in place as to
        prevent most suspicious deposits onto{' '}
        <Link href='xyro.io'>xyro.io</Link> from taking place without proper
        execution of KYC procedures onto the potential customer. 2) The second
        Line of Control: <Link href='xyro.io'>xyro.io</Link> makes its network
        aware so that any contact with the customer or player or authorized
        representative must give rise to the exercise of due diligence on
        transactions on the account concerned. These include:
        <li>
          Requests for the execution of financial transactions on the account;{' '}
        </li>
        <li>
          Requests in relation to means of payment or services on the account;{' '}
        </li>
        Also, the three-step verification with adjusted risk management should
        provide all necessary information’s about all costumers of{' '}
        <Link href='xyro.io'>xyro.io</Link> at all time. Also, all transactions
        must be overseen by employees over watched by the AML compliance
        officer, who is over watched by the general management. The specific
        transactions submitted to the customer support manager, possibly through
        their Compliance Manager, must also be subject to due diligence.
        Determination of the unusual nature of one or more transactions
        essentially depends on a subjective assessment, in relation to the
        knowledge of the customer (KYC), their financial behaviour and the
        transaction counterparty. An automated system will do these checks,
        while an employee cross checks them for additional security. The
        transactions observed on customer accounts for which it is difficult to
        gain a proper understanding of the lawful activities and origin of funds
        must therefore rapidly be considered atypical (as they are not directly
        justifiable). Any <Link href='xyro.io'>xyro.io</Link> staff member must
        inform the AML division of any atypical transactions which they observe
        and cannot attribute to a lawful activity or source of income known of
        the customer. 3) The third Line of Control: As a last line of defence
        against AML <Link href='xyro.io'>xyro.io</Link> will do manual checks on
        all suspicious and higher risk users in order to fully prevent money
        laundering. If fraud or money laundering is identified, the authorities
        will be informed.
        <Heading as='h5'>
          Reporting of Suspicious transactio <Link href='xyro.io'>xyro.io</Link>{' '}
        </Heading>
        In its internal procedures, <Link href='xyro.io'>xyro.io</Link>{' '}
        describes in precise terms, for the attention of its staff members, when
        it is necessary to report and how to proceed with such reporting.
        Reports of atypical transactions are analysed within the AML team in
        accordance with the precise methodology fully described in the internal
        procedures. Depending on the result of this examination and based on the
        information gathered, the AML team:
        <li>
          will decide whether it is necessary or not to send a report to the
          FIU, in accordance with the legal obligations provided in the Law of
          18 September 2017.{' '}
        </li>
        <li>
          will decide whether it is necessary to terminate the business
          relations with the customer.{' '}
        </li>
        <Heading as='h5'>Procedures</Heading>
        The AML rules, including minimum KYC standards will be translated into
        operational guidance or procedures that are available on the Intranet
        site of <Link href='xyro.io'>xyro.io</Link>-
        <Heading as='h5'>Record keeping </Heading>
        Records of data obtained for the purpose of identification must be kept
        for at least ten years after the business relationship has ended.
        Records of all transaction data must be kept for at least ten years
        following the carrying-out of the transactions or the end of the
        business relationship. This data will be safely, encrypted stored
        offline and online.
        <Heading as='h5'>Training:</Heading> <Link href='xyro.io'>xyro.io</Link>{' '}
        uses advanced AI and machine learning to further improve their AML
        defence. Also, trained developers constantly improve the AI in order to
        prevent any security flaws. A specialised Developer is in charge with
        constant improvements. While at the same time, their human employees
        will check and oversee the AI at any time and make manual controls on a
        risk based approve for which they get special training. The training and
        awareness program is reflected by its usage: -A mandatory AML training
        program in accordance with the latest regulatory evolutions, for all in
        touch with finances -Academic AML learning sessions for all new
        employees The content of this training program has to be established in
        accordance with the kind of business the trainees are working for and
        the posts they hold. These sessions are given by an AML-specialist
        working in Bull Gaming N.V. AML team.
        <Heading as='h5'>Auditing</Heading>
        Internal audit regularly establishes missions and reports about AML
        activities. Data Security: All data given by any user/customer will be
        kept secure, will not be sold or given to anyone else. Only if forced by
        law, or to prevent money laundering, data may be shared with the
        AML-authority of the affected state. <Link href='xyro.io'>
          xyro.io
        </Link>{' '}
        will follow all guidelines and rules of the data protection directive
        (officially Directive 95/46/EC)
      </Suspense>
    </>
  )
}
