SELECT
	gen_dtls.COUNTY
	,gen_dtls.BAR_NUMBER
    ,gen_dtls.FIRM_SIZE
    ,gen_dtls.FIRM_POSITION
    ,gen_dtls.FIRM_WEBSITE
    ,aba.EMAIL
    ,aba.STATE

FROM RAW.MISC_PROF_ABA_PRACTICE_AREAS practice

LEFT JOIN RAW.MISC_PROF_ABA_GENERAL_DETAILS gen_dtls
ON practice.BAR_NUMBER = gen_dtls.BAR_NUMBER

LEFT JOIN RAW.MISC_PROF_ABA aba
ON practice.BAR_NUMBER = REPLACE(aba.bar_number, '#', '')

WHERE PRACTICE_AREA LIKE '%criminal%'
AND COUNTY LIKE '%HILLSB%';
