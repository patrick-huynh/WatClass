SELECT c.subject, 
    AVG(r.difficulty), 
    AVG(r.analyticalThinking), 
    AVG(r.creativity), 
    AVG(r.collaboration) 
    FROM 
    (CourseRatings r JOIN Courses c on r.cId = c.cId) 
    GROUP BY c.subject;