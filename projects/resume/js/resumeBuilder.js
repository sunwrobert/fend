var bio = {
    name: 'Robert Sun',
    role: 'Web Developer',
    contacts: {
        mobile: '4076204888',
        email: 'sunwrobert@gmail.com',
        github: 'sunwrobert',
        twitter: 'robbasun',
        location: 'Orlando, Florida'
    },
    welcomeMessage: "I'm currently an Associate Applications developer at AT&T specializing in front-end development with a spice of full-stack on the side. I'm always eager to expand my skillset and improve as a software engineer. I have a passion for creating beautiful user-facing applications that are functional and a breeze to use. I'm also currently pursuing my Master's degree in computer science at Georgia Tech specializing in computing systems. I am always open to new opportunities, so feel free to drop me a message!",
    skills: [
        'Java', 'HTML', 'CSS', 'Git', 'Python'
    ],
    biopic: 'images/fry.jpg',
    display: function() {
        var formattedHeaderName = HTMLheaderName.replace("%data%", bio.name);
        var formattedHeaderRole = HTMLheaderRole.replace("%data%", bio.role);
        var formattedWelcomeMsg = HTMLwelcomeMsg.replace("%data%", bio.welcomeMessage);
        var formattedBioPic = HTMLbioPic.replace("%data%", bio.biopic);

        $("#header").prepend(formattedHeaderRole);
        $("#header").prepend(formattedHeaderName);
        appendContacts($("#topContacts"));
        $("#header").append(formattedWelcomeMsg);
        $("#header").append(formattedBioPic);

        $("#header").append(HTMLskillsStart);
        appendSkills($("#header"));
        appendContacts($("#footerContacts"));
    }
};

var work = {
    jobs: [{
        employer: 'AT&T',
        title: 'Associate Applications Developer',
        location: 'Atlanta',
        dates: 'January 2016 - Present',
        description: "Re-architected the Skills Pivot Coaches Dashboard from static HTML pages into a SPA using AngularJS, reducing network calls and data fetching by 9x. Developed a web application using Angular 2 to help users create, share, and comment on ideas to help improve the workplace. Developed features for a new release of AT&T's Personal Learning Portal"
    }, {
        employer: 'Rural Sourcing Inc.',
        title: 'Software Developer Intern',
        location: 'Atlanta',
        dates: 'February 2015 - July 2015',
        description: "Started and released version 1.0 of RSI’s Android application. Developed RESTful APIs consumed by RSI’s internal dashboard in Python. Improved project communication and stand-up statuses by developing a .NET desktop application where employees could give updates."
    }, {
        employer: 'Longstreet Solutions',
        title: 'Software Developer Intern',
        location: 'Atlanta',
        dates: 'June 2014 - July 2014',
        description: "Created extensive unit tests using PHPUnit and pushed corresponding bug fixes to improve code coverage. Increased security of the app to SQL injection through the use of PDOs and named placeholders. Developed an internal web application in HTML, CSS, and Javascript to add clients to Woblet’s database."
    }],
    display: function() {
        work.jobs.forEach(function(job){
            $("#workExperience").append(HTMLworkStart);
                var formattedEmployer = HTMLworkEmployer.replace("%data%", job.employer);
                var formattedTitle = HTMLworkTitle.replace("%data%", job.title);
                var formattedEmployerTitle = formattedEmployer + formattedTitle;
                var formattedEmployerLocation = HTMLworkLocation.replace("%data%", job.location)
                var formattedDates = HTMLworkDates.replace("%data%", job.dates);
                var formattedDescription = HTMLworkDescription.replace("%data%", job.description);
                
                $(".work-entry:last").append(formattedEmployerTitle);
                $(".work-entry:last").append(formattedEmployerLocation);
                $(".work-entry:last").append(formattedDates);
                $(".work-entry:last").append(formattedDescription);
        })
    }
};

var projects = {
    projects: [{
        title: 'Library Management System',
        dates: 'April 2015',
        images: ['http://placehold.it/350x150'],
        description: "Designed and implemented a web application in which a user could register an account, check out books, request extensions on books, check-out books, and other librarial functions. Developed backend through Python (Flask) and frontend through HTML, CSS (Bootstrap), and JavaScript. System was backed with a relational DBMS that supports SQL.",
    }],
    display: function() {
        projects.projects.forEach(function(project) {
            $("#projects").append(HTMLprojectStart);
            var formattedProjectTitle = HTMLprojectTitle.replace("%data%", project.title);
            var formattedProjectDate = HTMLprojectDates.replace("%data%", project.dates);
            var formattedProjectDescription = HTMLprojectDescription.replace("%data%", project.description);
            $(".project-entry:last").append(formattedProjectTitle);
            $(".project-entry:last").append(formattedProjectDate);
            $(".project-entry:last").append(formattedProjectDescription);
            project.images.forEach(function(image) {
                var formattedProjectImage = HTMLprojectImage.replace("%data%", image);
                $(".project-entry:last").append(formattedProjectImage);
            });
        });
    }
};

var education = {
    schools: [{
        name: 'Georgia Institute of Technology',
        location: 'Atlanta, GA',
        degree: 'Bachelors of Science',
        majors: [
            'Computer Science'
        ],
        dates: 'August 2012 - December 2015',
        url: 'http://www.gatech.edu/',

    }],
    onlineSchools: [{
        school: 'Udacity',
        title: 'Javascript',
        dates: '2016',
        url: 'http://udacity.com'
    }],
    display: function() {
        education.schools.forEach(function(school) {
            $("#education").append(HTMLschoolStart);
            var formattedHTMLschoolName = HTMLschoolName.replace("%data%", school.name);
            var formattedHTMLschoolDegree = HTMLschoolDegree.replace("%data%", school.degree);
            var formattedHTMLschoolDates = HTMLschoolDates.replace("%data%", school.dates);
            var formattedHTMLschoolLocation = HTMLschoolLocation.replace("%data%", school.location);
            var formattedHTMLschoolURL = HTMLschoolURL.replace("%data%", school.url);
            $(".education-entry:last").append(formattedHTMLschoolName + formattedHTMLschoolDegree);
            $(".education-entry:last").append(formattedHTMLschoolDates);
            $(".education-entry:last").append(formattedHTMLschoolLocation);
            $(".education-entry:last").append(formattedHTMLschoolURL);
            school.majors.forEach(function(major) {
                var formattedHTMLschoolMajor = HTMLschoolMajor.replace("%data%", major);
                $(".education-entry:last").append(formattedHTMLschoolMajor);
            });

        });
        $("#education").append(HTMLonlineClasses);

        $("#education").append(HTMLschoolStart);

        education.onlineSchools.forEach(function(school) {
            var formattedHTMLonlineTitle = HTMLonlineTitle.replace("%data%", school.title);
            var formattedHTMLonlineSchool = HTMLonlineSchool.replace("%data%", school.school);
            var formattedHTMLonlineDates = HTMLonlineDates.replace("%data%", school.dates);
            var formattedHTMLonlineURL = HTMLonlineURL.replace("%data%", school.url);
            $(".education-entry:last").append(formattedHTMLonlineTitle + formattedHTMLonlineSchool);
            $(".education-entry:last").append(formattedHTMLonlineDates);
            $(".education-entry:last").append(formattedHTMLonlineURL);
        });
    }
};

function appendSkills(ele) {
    bio.skills.forEach(function(skill) {
        var formattedSkill = HTMLskills.replace("%data%", skill);
        ele.append(formattedSkill);
    });
}

function appendContacts(ele) {
    for (var contact in bio.contacts) {
        if (bio.contacts.hasOwnProperty(contact)) {
            var formattedContact = HTMLcontactGeneric.replace("%contact%", contact);
            formattedContact = formattedContact.replace("%data%", bio.contacts[contact]);
            ele.append(formattedContact);
        }

    }
}

function inName(name) {
    var first = name.split(' ')[0];
    var last = name.split(' ')[1];
    return first[0].toUpperCase() + first.slice(1) + ' ' + last.toUpperCase();
}

function putOnResume() {
    $("#main").prepend(internationalizeButton);
    $("#mapDiv").append(googleMap);
    bio.display();
    work.display();
    projects.display();
    education.display();
}

putOnResume();