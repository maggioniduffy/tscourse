abstract class Department {
    // private name: string;
    static fiscalYear = 2020;
    protected employees: string[] = [];

    constructor(protected readonly id: string, protected name: string) {}

    abstract describe(this: Department): void; //define the structure

    addEmployee(employee: string) {
        this.employees.push(employee);
    }

    printEmployeeInfo() {
        console.log(this.employees.length);
        console.log(this.employees)
    }

    static createEmployee(name: string) {
        return { name }
    }

}

class ITDepartment extends Department {
    constructor(id: string, public admins: string[]) {
        super(id, 'IT');
    }

    describe() {
        console.log(this.name)
    }
}

class Accounting extends Department { //SINGLETON
    private lastReport: string;
    private static instance: Accounting;

    private constructor(id: string, private reports: string[]) { //cant call new
        super(id, 'accounting');
        this.lastReport = reports[0];
    }

    static getInstance() {
        if (!Accounting.instance) {
            this.instance = new Accounting('d22', ['marzo']);
        }
        return this.instance;
    }

    describe() {
        console.log('acccc', this.name)
    }

    addEmployee(name: string) { //override
        if (name === 'Max') {
            return;
        }
        this.employees.push(name); //must be protected
    }

    get mostRecentReport() {
        if (!this.lastReport) {
            throw new Error('no reports')
        }
        return this.lastReport;
    }

    set mostRecentReport(report: string) {
        this.addReport(report);
    }

    addReport(report: string) {
        this.reports.push(report);
        this.lastReport = report;
    }

 }

 //static method and props
const employee1 = Department.createEmployee('Max');
const year = Department.fiscalYear;

const acc = Accounting.getInstance();
const lastReport = acc.mostRecentReport; //like do get..()
acc.mostRecentReport = 'Faus'; // like do set...()

const it = new ITDepartment('aaaasss', ['Faus']);
it.addEmployee('manu');
it.addEmployee('faus');
it.printEmployeeInfo();

//const saleCopy = { name: 'aaa', describe: sales.describe};
//saleCopy.describe() // prints undefined

//SINGLETON