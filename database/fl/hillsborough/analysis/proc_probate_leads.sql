CREATE VIEW PROCESSED.FL_HILLSBOROUGH_PROBATE_RE_LEADS AS
SELECT DISTINCT
	hb_pb_p1.FILING_DATE
    ,hb_pb_p1.CASE_NUMBER
    ,hb_pb_p1.TITLE
    ,hb_pb_p1.DECEASED_FULL_NAME
    ,hb_pb_p1.DECEASED_ADDRESS
	,beneficiary.BENEFICIARY_FULL_NAME
    ,beneficiary.BENEFICIARY_ADDRESS
    ,hb_pb_p1.PROP_APP_OWNER
    ,hb_pb_p1.PROP_APP_ADDR
    ,hb_pb_p1.FOLIO
    ,p_a_last_sale.S_DATE
	,p_a_last_sale.GRANTEE
	,p_a_last_sale.DOC_NUM

FROM
(
	SELECT DISTINCT
		 -- addr_match.similarity
		 hb_prob.FILING_DATE
		,hb_prob.CASE_NUMBER
		,hb_prob.TITLE
		,CONCAT(hb_prob.FIRST_NAME, ' ', hb_prob.MIDDLE_NAME, ' ', hb_prob.LAST_NAME_COMPANY_NAME) AS DECEASED_FULL_NAME
		,hb_prob.PARTY_TYPE
		,hb_prob.PARTY_ADDRESS AS DECEASED_ADDRESS
		,CONCAT(hb_p_a.SITE_ADDR, ' ', hb_p_a.SITE_CITY, ' FL ', hb_p_a.SITE_ZIP) AS PROP_APP_ADDR
		,hb_p_a.OWNER AS PROP_APP_OWNER
        ,hb_p_a.FOLIO

	FROM RAW.HILLSBOROUGH_CLERK_PROP_APP_ADDR_MATCH AS addr_match

	LEFT JOIN RAW.HILLSBOROUGH_CLERK_PROBATE AS hb_prob
	ON addr_match.PARTY_ADDRESS = hb_prob.PARTY_ADDRESS

	LEFT JOIN RAW.HILLSBOROUGH_PROP_APP_PARCEL hb_p_a
	ON addr_match.PROP_APP_ADDR = CONCAT(hb_p_a.SITE_ADDR, ' ', hb_p_a.SITE_CITY, ' FL ', hb_p_a.SITE_ZIP)

  WHERE hb_prob.PARTY_TYPE = 'Decedent'
	AND CONCAT(hb_prob.FIRST_NAME, ' ', hb_prob.MIDDLE_NAME, ' ', hb_prob.LAST_NAME_COMPANY_NAME) IS NOT NULL
	AND hb_prob.PARTY_ADDRESS NOT IN ('')
) hb_pb_p1

LEFT JOIN
(
	SELECT DISTINCT
		hb_prob.CASE_NUMBER
		,CONCAT(hb_prob.FIRST_NAME, ' ', hb_prob.MIDDLE_NAME, ' ', hb_prob.LAST_NAME_COMPANY_NAME) AS BENEFICIARY_FULL_NAME
		,hb_prob.PARTY_ADDRESS AS BENEFICIARY_ADDRESS

	FROM RAW.HILLSBOROUGH_CLERK_PROBATE AS hb_prob

	WHERE hb_prob.PARTY_TYPE = 'Beneficiary'
	AND hb_prob.PARTY_ADDRESS NOT IN ('')
	AND CONCAT(hb_prob.FIRST_NAME, ' ', hb_prob.MIDDLE_NAME, ' ', hb_prob.LAST_NAME_COMPANY_NAME) IS NOT NULL
) beneficiary

ON hb_pb_p1.CASE_NUMBER = beneficiary.CASE_NUMBER

LEFT JOIN
(
	SELECT DISTINCT
		hb_p_a_sales.FOLIO
		,hb_p_a_sales.S_DATE
		,hb_p_a_sales.GRANTEE
		,hb_p_a_sales.DOC_NUM

	FROM
	(
		SELECT
			FOLIO
			,MAX(S_DATE) AS S_DATE

		FROM RAW.HILLSBOROUGH_PROP_APP_ALL_SALES
		GROUP BY FOLIO
	) last_sale

	LEFT JOIN RAW.HILLSBOROUGH_PROP_APP_ALL_SALES AS hb_p_a_sales
    ON last_sale.FOLIO = hb_p_a_sales.FOLIO
	AND last_sale.S_DATE = hb_p_a_sales.S_DATE
) p_a_last_sale
ON hb_pb_p1.FOLIO = p_a_last_sale.FOLIO;
