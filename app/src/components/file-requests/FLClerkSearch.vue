<template>
  <div id="file-request-search">
    <div class="container">
      <h4>Request FL County Clerk Civil Data</h4>
      <div id="search-display-error">{{ searchError }}</div>
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group">
            <label for="county-search-item">County:</label>
            <select id="county-search-item" class="form-control" aria-label="County" v-model="filters.county">
              <option value="All Counties">All Counties</option>
              <option value="hillsborough">Hillsborough</option>
            </select>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="form-group">
            <label for="case-type-search-item">Case Type:</label>
            <select id="case-type-search-item" class="form-control" aria-label="Case Type" v-model="filters.case_type">
              <option value="All Case Types">All Case Types</option>
              <option value="(DOR) Administrative Support Order">(DOR) Administrative Support Order</option>
              <option value="(DOR) Dependent Support Enforcement">(DOR) Dependent Support Enforcement</option>
              <option value="(DOR) New Obligee">(DOR) New Obligee</option>
              <option value="(DOR) Paternity">(DOR) Paternity</option>
              <option value="(DOR) UIFSA Interstate Support">(DOR) UIFSA Interstate Support</option>
              <option value="(DV) Domestic Violence with Child(ren)">(DV) Domestic Violence with Child(ren)</option>
              <option value="(DV) Domestic Violence without Child(ren)">(DV) Domestic Violence without Child(ren)</option>
              <option value="(DV) Stalking">(DV) Stalking</option>
              <option value="90 Day Extension">90 Day Extension</option>
              <option value="Accounts">Accounts</option>
              <option value="Addendum">Addendum</option>
              <option value="Animal Custody">Animal Custody</option>
              <option value="Annulment">Annulment</option>
              <option value="AntiTrust/Trade Regulation">AntiTrust/Trade Regulation</option>
              <option value="Appeal Final Order">Appeal Final Order</option>
              <option value="Appeal Non Final Order">Appeal Non Final Order</option>
              <option value="Arbitration">Arbitration</option>
              <option value="Asbestos">Asbestos</option>
              <option value="Auto Negligence">Auto Negligence</option>
              <option value="Bond Validation">Bond Validation</option>
              <option value="Breach of Contract">Breach of Contract</option>
              <option value="Business Torts">Business Torts</option>
              <option value="Business Transactions">Business Transactions</option>
              <option value="CASE CREATED IN ERROR (DO NOT REPORT)">CASE CREATED IN ERROR (DO NOT REPORT)</option>
              <option value="CC Abandoned Property $0 to $15,000.00">CC Abandoned Property $0 to $15,000.00</option>
              <option value="CC Abandoned Property $15,000.01 to  $30,000.00">CC Abandoned Property $15,000.01 to  $30,000.00</option>
              <option value="CC Accounts $15,000.01 to $30,000.00">CC Accounts $15,000.01 to $30,000.00</option>
              <option value="CC Accounts $8,000.01 to  $15,000.00">CC Accounts $8,000.01 to  $15,000.00</option>
              <option value="CC Auto Negligence $15,000.01 to $30,000.00">CC Auto Negligence $15,000.01 to $30,000.00</option>
              <option value="CC Auto Negligence $8,000.01 to  $15,000.00">CC Auto Negligence $8,000.01 to  $15,000.00</option>
              <option value="CC Breach of Contract $15,000.01 to $30,000.00">CC Breach of Contract $15,000.01 to $30,000.00</option>
              <option value="CC Breach of Contract $8,000.01 to  $15,000.00">CC Breach of Contract $8,000.01 to  $15,000.00</option>
              <option value="CC Contract & Indebtedness $15,000.01 to $30,000.00">CC Contract & Indebtedness $15,000.01 to $30,000.00</option>
              <option value="CC Contract & Indebtedness $8,000.01 to  $15,000.00">CC Contract & Indebtedness $8,000.01 to  $15,000.00</option>
              <option value="CC Conversion $15,000.01 to $30,000.00">CC Conversion $15,000.01 to $30,000.00</option>
              <option value="CC Conversion $8,000.01 to  $15,000.00">CC Conversion $8,000.01 to  $15,000.00</option>
              <option value="CC Debt Owed $15,000.01 to $30,000.00">CC Debt Owed $15,000.01 to $30,000.00</option>
              <option value="CC Debt Owed $8,000.01 to  $15,000.00">CC Debt Owed $8,000.01 to  $15,000.00</option>
              <option value="CC Declaratory Judgment $0.00 to $15,000.00">CC Declaratory Judgment $0.00 to $15,000.00</option>
              <option value="CC Declaratory Judgment $15,000.01 to  $30,000.00">CC Declaratory Judgment $15,000.01 to  $30,000.00</option>
              <option value="CC Enforce Lien $0.00 to  $15,000.00">CC Enforce Lien $0.00 to  $15,000.00</option>
              <option value="CC Enforce Lien $15,000.01 to  $30,000.00">CC Enforce Lien $15,000.01 to  $30,000.00</option>
              <option value="CC Enforce Order/Judgment $15,000.01 to $30,000.00">CC Enforce Order/Judgment $15,000.01 to $30,000.00</option>
              <option value="CC Enforce Order/Judgment $8,000.01 to  $15,000.00">CC Enforce Order/Judgment $8,000.01 to  $15,000.00</option>
              <option value="CC Equity $15,000.01 to  $30,000.00">CC Equity $15,000.01 to  $30,000.00</option>
              <option value="CC Equity $8,000.01 to  $15,000.00">CC Equity $8,000.01 to  $15,000.00</option>
              <option value="CC Goods Sold $8,000.01 to  $15,000.00">CC Goods Sold $8,000.01 to  $15,000.00</option>
              <option value="CC Interpleader $0 to $15,000.00">CC Interpleader $0 to $15,000.00</option>
              <option value="CC Interpleader $15,000.01 to $30,000.00">CC Interpleader $15,000.01 to $30,000.00</option>
              <option value="CC Money Lent $15,000.01 to $30,000.00">CC Money Lent $15,000.01 to $30,000.00</option>
              <option value="CC Money Lent $8,000.01 to  $15,000.00">CC Money Lent $8,000.01 to  $15,000.00</option>
              <option value="CC Non-Monetary">CC Non-Monetary</option>
              <option value="CC Other Negligence $15,000.01 to $30,000.00">CC Other Negligence $15,000.01 to $30,000.00</option>
              <option value="CC Other Negligence $8,000.01 to  $15,000.00">CC Other Negligence $8,000.01 to  $15,000.00</option>
              <option value="CC Personal Injury Protection $15,000.01 to $30,000.00">CC Personal Injury Protection $15,000.01 to $30,000.00</option>
              <option value="CC Personal Injury Protection $8,000.01 to  $15,000.00">CC Personal Injury Protection $8,000.01 to  $15,000.00</option>
              <option value="CC Promissory Note $15,000.01 to $30,000.00">CC Promissory Note $15,000.01 to $30,000.00</option>
              <option value="CC Promissory Note $8,000.01 to  $15,000.00">CC Promissory Note $8,000.01 to  $15,000.00</option>
              <option value="CC Real Property/Mortgage Foreclosure  $0.00 to  $15,000.00">CC Real Property/Mortgage Foreclosure  $0.00 to  $15,000.00</option>
              <option value="CC Real Property/Mortgage Foreclosure  $15,000.01 to  $30K">CC Real Property/Mortgage Foreclosure  $15,000.01 to  $30K</option>
              <option value="CC Replevin $15,000.01 to $30,000.00">CC Replevin $15,000.01 to $30,000.00</option>
              <option value="CC Replevin $8,000.01 to  $15,000.00">CC Replevin $8,000.01 to  $15,000.00</option>
              <option value="CC Work Done $8,000.01 to  $15,000.00">CC Work Done $8,000.01 to  $15,000.00</option>
              <option value="Certiorari">Certiorari</option>
              <option value="Civil Action for Damages">Civil Action for Damages</option>
              <option value="Condominium">Condominium</option>
              <option value="Constitutional Challenge Statute-Ordinance">Constitutional Challenge Statute-Ordinance</option>
              <option value="Construction Defect">Construction Defect</option>
              <option value="Contraband Forfeiture">Contraband Forfeiture</option>
              <option value="Contract & Indebtedness">Contract & Indebtedness</option>
              <option value="Conversion">Conversion</option>
              <option value="Custody">Custody</option>
              <option value="Declaration of Paternity (Non-DOR)">Declaration of Paternity (Non-DOR)</option>
              <option value="Declaratory Judgment">Declaratory Judgment</option>
              <option value="Delinquent Tenant">Delinquent Tenant</option>
              <option value="Discrimination">Discrimination</option>
              <option value="Disestablishment of Paternity">Disestablishment of Paternity</option>
              <option value="Dissolution of Marriage">Dissolution of Marriage</option>
              <option value="Dissolution of Marriage with Children">Dissolution of Marriage with Children</option>
              <option value="Dissolve Corporation">Dissolve Corporation</option>
              <option value="Distress for Rent">Distress for Rent</option>
              <option value="Domesticate Foreign Order">Domesticate Foreign Order</option>
              <option value="Emancipation">Emancipation</option>
              <option value="Eminent Domain">Eminent Domain</option>
              <option value="Enforce Order/Judgment">Enforce Order/Judgment</option>
              <option value="Equitable Relief">Equitable Relief</option>
              <option value="Habeas Corpus">Habeas Corpus</option>
              <option value="Injunction">Injunction</option>
              <option value="Insurance Claims">Insurance Claims</option>
              <option value="Intellectual Property">Intellectual Property</option>
              <option value="Involuntary Civil Commit Sexually Violent Predator">Involuntary Civil Commit Sexually Violent Predator</option>
              <option value="Libel-Slander">Libel-Slander</option>
              <option value="LT Non-Residential Distress for Rent $0.00-$15,000">LT Non-Residential Distress for Rent $0.00-$15,000</option>
              <option value="LT Non-Residential Distress for Rent $15.000.01-$30,000">LT Non-Residential Distress for Rent $15.000.01-$30,000</option>
              <option value="LT Non-Residential Eviction- Possession Only">LT Non-Residential Eviction- Possession Only</option>
              <option value="LT Non-Residential Eviction/Past Due Rent $0.00-$15,000.00">LT Non-Residential Eviction/Past Due Rent $0.00-$15,000.00</option>
              <option value="LT Non-Residential Eviction/Past Due Rent $15.000.01-$30,000">LT Non-Residential Eviction/Past Due Rent $15.000.01-$30,000</option>
              <option value="LT Residential Distress for Rent $0.00-$15,000.00">LT Residential Distress for Rent $0.00-$15,000.00</option>
              <option value="LT Residential Eviction- Possession Only">LT Residential Eviction- Possession Only</option>
              <option value="LT Residential Eviction/Past Due Rent $0.00-$15,000.00">LT Residential Eviction/Past Due Rent $0.00-$15,000.00</option>
              <option value="LT Residential Eviction/Past Due Rent $15.000.01-$30,000">LT Residential Eviction/Past Due Rent $15.000.01-$30,000</option>
              <option value="LT Unlawful Detainer">LT Unlawful Detainer</option>
              <option value="Modify Final Judgment">Modify Final Judgment</option>
              <option value="Mortgage Foreclosure - Commercial -1-  $50,000 or Less">Mortgage Foreclosure - Commercial -1-  $50,000 or Less</option>
              <option value="Mortgage Foreclosure - Commercial -2- $50,001 - $249,999">Mortgage Foreclosure - Commercial -2- $50,001 - $249,999</option>
              <option value="Mortgage Foreclosure - Commercial -3- $250,000 or More">Mortgage Foreclosure - Commercial -3- $250,000 or More</option>
              <option value="Mortgage Foreclosure - Homestead -1- $50,000 or Less">Mortgage Foreclosure - Homestead -1- $50,000 or Less</option>
              <option value="Mortgage Foreclosure - Homestead -2- $50,001 - $249,999">Mortgage Foreclosure - Homestead -2- $50,001 - $249,999</option>
              <option value="Mortgage Foreclosure - Homestead -3- $250,000 or More">Mortgage Foreclosure - Homestead -3- $250,000 or More</option>
              <option value="Mortgage Foreclosure - NonHomestead -1- $50,000 or Less">Mortgage Foreclosure - NonHomestead -1- $50,000 or Less</option>
              <option value="Mortgage Foreclosure - NonHomestead -2- $50,000 - $249,999">Mortgage Foreclosure - NonHomestead -2- $50,000 - $249,999</option>
              <option value="Mortgage Foreclosure - NonHomestead -3- $250,000 or More">Mortgage Foreclosure - NonHomestead -3- $250,000 or More</option>
              <option value="Name Change">Name Change</option>
              <option value="Negligent Security">Negligent Security</option>
              <option value="Nursing Home Negligence">Nursing Home Negligence</option>
              <option value="Other">Other</option>
              <option value="Other Admistrative Review">Other Admistrative Review</option>
              <option value="Other Negligence">Other Negligence</option>
              <option value="Parental Responsibility / Time Sharing / Parent Plan">Parental Responsibility / Time Sharing / Parent Plan</option>
              <option value="Partition 1 - $50,000 or Less">Partition 1 - $50,000 or Less</option>
              <option value="Partition 2 - $50,001 - $249,999">Partition 2 - $50,001 - $249,999</option>
              <option value="Premises Liability-Commercial">Premises Liability-Commercial</option>
              <option value="Premises Liability-Residential">Premises Liability-Residential</option>
              <option value="Product Liability">Product Liability</option>
              <option value="Professional Malpractice Business">Professional Malpractice Business</option>
              <option value="Professional Malpractice Medical">Professional Malpractice Medical</option>
              <option value="Professional Malpractice Other">Professional Malpractice Other</option>
              <option value="Prohibition">Prohibition</option>
              <option value="Real Property -1- $50,000 or Less">Real Property -1- $50,000 or Less</option>
              <option value="Real Property -2- $50,001 - $249,999">Real Property -2- $50,001 - $249,999</option>
              <option value="Real Property -3- $250,000 or More">Real Property -3- $250,000 or More</option>
              <option value="Removal of Tenant">Removal of Tenant</option>
              <option value="Replevin">Replevin</option>
              <option value="Rule to Show Cause">Rule to Show Cause</option>
              <option value="SC Accounts-Tier 1 $0.00-$99.99">SC Accounts-Tier 1 $0.00-$99.99</option>
              <option value="SC Accounts-Tier 2 $100.00-$500.00">SC Accounts-Tier 2 $100.00-$500.00</option>
              <option value="SC Accounts-Tier 3 $500.01-$2,500.00">SC Accounts-Tier 3 $500.01-$2,500.00</option>
              <option value="SC Accounts-Tier 4 $2,500.01-$5,000.00">SC Accounts-Tier 4 $2,500.01-$5,000.00</option>
              <option value="SC Accounts-Tier 5 $ $5,000.01-$8,000.00">SC Accounts-Tier 5 $ $5,000.01-$8,000.00</option>
              <option value="SC Auto Negligence-Tier 2 $100.00-$500.00">SC Auto Negligence-Tier 2 $100.00-$500.00</option>
              <option value="SC Auto Negligence-Tier 3 $500.01-$2,500.00">SC Auto Negligence-Tier 3 $500.01-$2,500.00</option>
              <option value="SC Auto Negligence-Tier 4 $2,500.01-$5,000.00">SC Auto Negligence-Tier 4 $2,500.01-$5,000.00</option>
              <option value="SC Auto Negligence-Tier 5 $5,000.01-$8,000.00">SC Auto Negligence-Tier 5 $5,000.01-$8,000.00</option>
              <option value="SC Breach of Contract-Tier 1  $0.00-$99.99">SC Breach of Contract-Tier 1  $0.00-$99.99</option>
              <option value="SC Breach of Contract-Tier 2 $100.00-$500.00">SC Breach of Contract-Tier 2 $100.00-$500.00</option>
              <option value="SC Breach of Contract-Tier 3 $500.01-$2,500.00">SC Breach of Contract-Tier 3 $500.01-$2,500.00</option>
              <option value="SC Breach of Contract-Tier 4 $2,500.01-$5,000.00">SC Breach of Contract-Tier 4 $2,500.01-$5,000.00</option>
              <option value="SC Breach of Contract-Tier 5 $5,000.01-$8,000.00">SC Breach of Contract-Tier 5 $5,000.01-$8,000.00</option>
              <option value="SC Debt Owed-Tier 1  $0.00-$99.99">SC Debt Owed-Tier 1  $0.00-$99.99</option>
              <option value="SC Debt Owed-Tier 2 $100.00-$500.00">SC Debt Owed-Tier 2 $100.00-$500.00</option>
              <option value="SC Debt Owed-Tier 3 $500.01-$2,500.00">SC Debt Owed-Tier 3 $500.01-$2,500.00</option>
              <option value="SC Debt Owed-Tier 4 $2,500.01-$5,000.00">SC Debt Owed-Tier 4 $2,500.01-$5,000.00</option>
              <option value="SC Debt Owed-Tier 5 $5,000.01-$8,000.00">SC Debt Owed-Tier 5 $5,000.01-$8,000.00</option>
              <option value="SC Foreign Judgment $0 - $5,000.00">SC Foreign Judgment $0 - $5,000.00</option>
              <option value="SC Foreign Judgment $5,000.01 to $8,000.00">SC Foreign Judgment $5,000.01 to $8,000.00</option>
              <option value="SC Interpleader-Tier 1 $0.00-$99.99">SC Interpleader-Tier 1 $0.00-$99.99</option>
              <option value="SC Interpleader-Tier 2 $100.00-$500.00">SC Interpleader-Tier 2 $100.00-$500.00</option>
              <option value="SC Interpleader-Tier 3 $500.01-$2,500.00">SC Interpleader-Tier 3 $500.01-$2,500.00</option>
              <option value="SC Interpleader-Tier 4 $2,500.01-$5,000.00">SC Interpleader-Tier 4 $2,500.01-$5,000.00</option>
              <option value="SC Interpleader-Tier 5 $5,000.01-$8,000.00">SC Interpleader-Tier 5 $5,000.01-$8,000.00</option>
              <option value="SC Personal Injury Protection-Tier 1 $0.00-$99.99">SC Personal Injury Protection-Tier 1 $0.00-$99.99</option>
              <option value="SC Personal Injury Protection-Tier 2 $100.00-$500.00">SC Personal Injury Protection-Tier 2 $100.00-$500.00</option>
              <option value="SC Personal Injury Protection-Tier 3 $500.01-$2,500.00">SC Personal Injury Protection-Tier 3 $500.01-$2,500.00</option>
              <option value="SC Personal Injury Protection-Tier 4 $2,500.01-$5,000.00">SC Personal Injury Protection-Tier 4 $2,500.01-$5,000.00</option>
              <option value="SC Personal Injury Protection-Tier 5 $5,000.01 to $8,000.00">SC Personal Injury Protection-Tier 5 $5,000.01 to $8,000.00</option>
              <option value="SC Replevin-Tier 1 $0.00-$1,000.00">SC Replevin-Tier 1 $0.00-$1,000.00</option>
              <option value="SC Replevin-Tier 2 $1,000.01-$2,500.00">SC Replevin-Tier 2 $1,000.01-$2,500.00</option>
              <option value="SC Replevin-Tier 3 $2,500.01-$5,000.00">SC Replevin-Tier 3 $2,500.01-$5,000.00</option>
              <option value="SC Replevin-Tier 4 $5,000.01 to $8,000.00">SC Replevin-Tier 4 $5,000.01 to $8,000.00</option>
              <option value="SC Windshield Litigation-Tier 1 $0.00-$99.99">SC Windshield Litigation-Tier 1 $0.00-$99.99</option>
              <option value="SC Windshield Litigation-Tier 2 $100.00-$500.00">SC Windshield Litigation-Tier 2 $100.00-$500.00</option>
              <option value="SC Windshield Litigation-Tier 3 $500.01-$2,500.00">SC Windshield Litigation-Tier 3 $500.01-$2,500.00</option>
              <option value="SC Windshield Litigation-Tier 4 $2,500.01-$5,000.00">SC Windshield Litigation-Tier 4 $2,500.01-$5,000.00</option>
              <option value="SC Windshield Litigation-Tier 5 $5,000.01-$8,000.00">SC Windshield Litigation-Tier 5 $5,000.01-$8,000.00</option>
              <option value="Securities Litigation">Securities Litigation</option>
              <option value="Shareholder Derivative Action">Shareholder Derivative Action</option>
              <option value="Simplified Dissolution">Simplified Dissolution</option>
              <option value="Specific Performance">Specific Performance</option>
              <option value="Superseding Support Order">Superseding Support Order</option>
              <option value="Support">Support</option>
              <option value="Temporary Custody by Extended Family Member">Temporary Custody by Extended Family Member</option>
              <option value="Tobacco Litigation">Tobacco Litigation</option>
              <option value="Trade Secrets">Trade Secrets</option>
              <option value="Trust Litigation">Trust Litigation</option>
              <option value="Unlawful Detainer">Unlawful Detainer</option>
              <option value="Writ of Mandamus">Writ of Mandamus</option>
              <option value="Writ of Quo Warranto">Writ of Quo Warranto</option>
            </select>
          </div>
        </div>
      </div>
      <!-- Job Search Boxes -->
      <div class="form-group">
        <label for="case-number-search-item">Case Number:</label>
        <input id="case-number-search-item" class="form-control" type="text" v-model="filters.case_number" />
      </div>
      <!-- Case Title -->
      <div class="form-group">
        <label for="case-title-search-item">Case Title:</label>
        <input id="case-title-search-item" class="form-control" type="text" v-model="filters.case_title" />
      </div>
      <!-- Party Name -->
      <div class="form-group">
        <label for="party-name-search-item">Party Name:</label>
        <input id="party-name-search-item" class="form-control" type="text" v-model="filters.party_name" />
      </div>
      <!-- Attorney Name -->
      <div class="form-group">
        <label for="attorney-name-search-item">Attorney Name:</label>
        <input id="attorney-name-search-item" class="form-control" type="text" v-model="filters.attorney_name" />
      </div>
      <!-- Party Types -->
      <div class="form-group">
        <label for="party-type-search-item">Party Type:</label>
        <select id="party-type-search-item" class="form-control" aria-label="Party Type" v-model="filters.party_type">
          <option value="All Party Types">All Party Types</option>
          <option value="Plaintiff">Plaintiff</option>
          <option value="Defendant">Defendant</option>
          <option value="Petitioner">Petitioner</option>
          <option value="Respondent">Respondent</option>
        </select>
      </div>
      <!-- Date Search Boxes -->
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group">
            <label for="from-date-input">Filing Date Range Start:</label>
            <b-input-group class="mb-3">
              <b-form-input
                id="from-date-input"
                v-model="filters.date.from"
                :state="filterStates.date.from"
                type="text"
                placeholder="YYYY-MM-DD"
                autocomplete="off"
              ></b-form-input>
              <b-input-group-append>
                <b-form-datepicker
                  v-model="filters.date.from"
                  button-only
                  right
                  locale="en-US"
                  aria-controls="from-date-input"
                ></b-form-datepicker>
              </b-input-group-append>
            </b-input-group>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="form-group">
            <label for="to-date-input">Filing Date Range End:</label>
            <b-input-group class="mb-3">
              <b-form-input
                id="to-date-input"
                v-model="filters.date.to"
                :state="filterStates.date.to"
                type="text"
                placeholder="YYYY-MM-DD"
                autocomplete="off"
              ></b-form-input>
              <b-input-group-append>
                <b-form-datepicker
                  v-model="filters.date.to"
                  button-only
                  right
                  locale="en-US"
                  aria-controls="to-date-input"
                ></b-form-datepicker>
              </b-input-group-append>
            </b-input-group>
          </div>
        </div>
      </div>
      <!-- Amount Search Boxes -->
      <div class="form-group">
        <label for="party-addr-search-item">Party Address:</label>
        <input id="party-addr-search-item" class="form-control" type="text" v-model="filters.party_address" />
      </div>
      <button class="btn btn-primary" v-on:click="onSearchClick">Submit</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ApiService from "@/http/file-request";

export default {
  name: "FileRequestSearch",
  components: { },
  data () {
    return {
      searchError: "",
      filters: {
        county: "All Counties",
        case_type: "All Case Types",
        case_number: "",
        case_title: "",
        party_name: "",
        attorney_name: "",
        party_type: "All Party Types",
        date: {
          from: "",
          to: ""
        },
        party_address: ""
      },
      result: {
        entries: 0,
        price: "0"
      },
      filterStates: {
        date: {
          from: null,
          to: null
        }
      }
    };
  },
  computed: {
    downloadFilters () {
      return this.$store.getters["FileRequest/getDownloadFilters"];
    }
  },
  methods: {
    onSearchClickDelete () {
      // Reset search Error
      this.searchError = "";

      // this.$store.dispatch("FileRequest/QUERY_FILE_INFO", JSON.parse(JSON.stringify(this.filters))).catch(err => {
      this.$store.dispatch("FileRequest/QUERY_FILE_INFO", JSON.parse(JSON.stringify(this.filters))).catch(err => {
        // this.searchError = err.response.data.msg;
        console.log(err);
      });
    },
    dateValid (date) {
      const dateRegex = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
      if (!dateRegex.test(date)) {
        return false;
      }
      return true;
    },
    datesValid () {
      if (this.filters.date.min !== "" && !this.dateValid(this.filters.date.min)) {
        return false;
      }
      if (this.filters.date.max !== "" && this.dateValid(this.filters.date.max)) {
        return false;
      }
      return true;
    },
    onSearchClick () {
      // Reset search Error
      this.searchError = "";

      this.$store.dispatch("FileRequest/QUERY_FILE_INFO", JSON.parse(JSON.stringify(this.filters))).catch(err => {
        // this.searchError = err.response.data.msg;
        console.log(err);
      });

      this.displayError = "";

      ApiService.getSampleFile().then(response => {
        const blob = new Blob([response.data], { type: response.headers["content-type"] });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "HILLSBOROUGH_CLERK_CIVIL.csv";
        link.click();
        URL.revokeObjectURL(link.href);
      }).catch(err => {
        this.displayError = err.response.data.msg;
      });
    }
  },
  watch: {
    // Watcher on from date filter
    "filters.date.from": function (newVal, oldVal) {
      if (newVal === "") {
        this.filterStates.date.from = null;
      } else if (this.dateValid(newVal) === false) {
        this.filterStates.date.from = false;
      } else {
        this.filterStates.date.from = true;
      }
    },
    // Watcher on to date filter
    "filters.date.to": function toDate (newVal, oldVal) {
      if (newVal === "") {
        this.filterStates.date.min = null;
      } else if (!this.dateValid(newVal)) {
        this.filterStates.date.to = false;
      } else {
        this.filterStates.date.to = true;
      }
    }
  }
};
</script>

<style lang="scss">
#file-request-search {
  margin-top: 10px;
  margin-bottom: 10px;

  h4 {
    font-weight: bold;
  }

  #search-display-error {
    color: red;
  }

  .form-group {
    text-align: left;

    label:nth-child(1) {
      font-weight: bold;
    }
  }
}
</style>
