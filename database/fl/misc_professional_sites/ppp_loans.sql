CREATE VIEW PRODUCTION.PPP_LOANS_FULL AS
SELECT DISTINCT
    ppp_index.Organization
    ,ppp_index.Location
    ,ppp_index.`Business Type`
    ,ppp_index.`Loan Amount` AS loan_range
    ,loan_remap.loan_min
	,loan_remap.loan_max
    ,ppp_specific.industry
    ,CONVERT(ppp_specific.jobs_reported, SIGNED INTEGER) AS jobs_reported
    ,ppp_specific.lender
    ,STR_TO_DATE(ppp_specific.date_approved, '%M %d, %Y') AS date_approved
    ,ppp_specific.ppp_url

FROM RAW.PPP_LOANS AS ppp_index

INNER JOIN RAW.PPP_LOANS_SPECIFIC_COMPANY AS ppp_specific
ON ppp_index.ppp_url = ppp_specific.ppp_url

LEFT JOIN
(
	SELECT
		column_0 AS loan_range
		,column_1 AS loan_min
		,column_2 AS loan_max
	FROM (
		VALUES ROW ('  $5-10 million', 5000000, 10000000),
		ROW ('  $2-5 million', 2000000, 5000000),
		ROW ('  $1-2 million', 1000000, 2000000),
		ROW ('  $350,000-1 million', 350000, 1000000),
		ROW ('  $150,000-350,000', 150000, 350000)
	) a

) loan_remap

ON ppp_index.`Loan Amount` = loan_remap.loan_range
;
