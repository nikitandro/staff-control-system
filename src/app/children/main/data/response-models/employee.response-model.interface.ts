export interface IEmployeeResponseModel {
    id: number,
    firstName: string,
    lastName: string,
    patronymic: string,
    birthDate: string,
    employmentDate: string,
    departmentId: string,
    postId: string,
    salary: number,
    successRate: string,
    isFired: boolean,
    firstWorkDay: string,
    vacationsList: any[],
    salaryIncreaseList: any[],
    education: any[],
    firingDate: string
}
