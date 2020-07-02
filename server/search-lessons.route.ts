


import {Request, Response} from 'express';
import {LESSONS} from "./db-data";
import {setTimeout} from "timers";




export function searchLessons(req: Request, res: Response) {

    console.log('Searching for lessons ...');

//    const error = (Math.random() >= 0.5);

//    if (error) {
//        console.log("ERROR loading lessons!");
//        res.status(500).json({message: 'random error occurred.'});
//    }
//    else {


        const queryParams = req.query;

        const courseId = queryParams.courseId,
            filter = queryParams.filter || '',
            sortOrder = queryParams.sortOrder,
            pageNumber = parseInt(<string>queryParams.pageNumber) || 0,
            pageSize = parseInt(<string>queryParams.pageSize);

        let lessons = Object.values(LESSONS).filter(lesson => lesson.courseId == parseInt(<string>courseId)).sort((l1, l2) => l1.id - l2.id);

        if (filter) {
            lessons = lessons.filter(lesson => lesson.description.trim().toLowerCase().search((<string>filter).toLowerCase()) >= 0);
        }

        if (sortOrder == "desc") {
            lessons = lessons.reverse();
        }

        const initialPos = pageNumber * pageSize;

        const lessonsPage = lessons.slice(initialPos, initialPos + pageSize);

        setTimeout(() => {
            res.status(200).json({payload: lessonsPage});
        },1000);

 //   }




}
