package com.cognizant.orm_learn;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

// import com.cognizant.orm_learn.model.Country;
import com.cognizant.orm_learn.model.Department;
import com.cognizant.orm_learn.model.Employee;
import com.cognizant.orm_learn.model.Skill;
// import com.cognizant.orm_learn.model.Stock;
import com.cognizant.orm_learn.repository.StockRepository;
import com.cognizant.orm_learn.service.CountryService;
import com.cognizant.orm_learn.service.DepartmentService;
import com.cognizant.orm_learn.service.EmployeeService;
import com.cognizant.orm_learn.service.SkillService;

import jakarta.transaction.TransactionScoped;
import jakarta.transaction.Transactional;

// import java.math.BigDecimal;
// import java.time.LocalDate;
// import java.util.List;


@SpringBootApplication
public class OrmLearnApplication{
	
	// @Autowired
	// private CountryService countryService;

	// @Autowired
	// private StockRepository stockRepository;

	private static DepartmentService departmentService;

	private static SkillService skillService;

	private static EmployeeService employeeService;
	
	private static final Logger LOGGER = LoggerFactory.getLogger(OrmLearnApplication.class);
	
	public static void main(String[] args) {
		ApplicationContext context = SpringApplication.run(OrmLearnApplication.class, args);
		departmentService = context.getBean(DepartmentService.class);
		skillService = context.getBean(SkillService.class);
		employeeService = context.getBean(EmployeeService.class);
		testGetAllPermanentEmployees();
	}
	public static void testGetAllPermanentEmployees() {

        LOGGER.info("Start");

        List<Skill> skills = employeeService.getSkillsOfPermanentEmployees();

        LOGGER.debug("Permanent Employees' skills are :{}", skills);

        // employees.forEach(e -> LOGGER.debug("Skills:{}", e.getSkills()));

        LOGGER.info("End");

    }

	// private static void testAddSkillToEmployee(int id){
	// 	Employee employee = employeeService.get(id);
	// 	Skill newSkill = skillService.get(4);
	// 	Set<Skill> skills = employee.getSkills();
	// 	skills.add(newSkill);
	// 	employee.setSkills(skills);
	// 	employeeService.save(employee);
	// 	LOGGER.debug("employee skills:{}", employee.getSkills());
	// }

	// private static void getemployeeSkills(Employee employee){
	// 	LOGGER.debug("Employee skills: {}",employee.getSkills());
	// }

	// private static void testGetDepartment(){
	// 	Department department = departmentService.get(1);//has 2 employees
	// 	Set<Employee> employees = department.getEmployees();
	// 	for(Employee employee : employees){
	// 		System.out.println(employee.getName());
	// 	}
	// 	LOGGER.debug("employees: {}", employees);
	// }

	// private static void testUpdateEmployee(){
	// 	Employee employee = employeeService.get(5);
	// 	Department department = departmentService.get(2);
	// 	employee.setDepartment(department);
	// 	employeeService.save(employee);
	// 	LOGGER.debug("Employee: {}", employee);
	// }

	// private static void testGetEmployee() {
    //     LOGGER.info("Start");
    //     Employee employee = employeeService.get(1);
    //     LOGGER.debug("Employee:{}", employee);
    //     LOGGER.debug("Department:{}", employee.getDepartment());
    //     LOGGER.info("End");
    // }
	// private static void testAddEmployee(){
	// 	Department department = departmentService.get(1);
	// 	Employee employee = new Employee();
	// 	employee.setName("John");
	// 	employee.setSalary(new BigDecimal("50000"));
	// 	employee.setDepartment(department);

	// 	employeeService.save(employee);

	// 	LOGGER.debug("Employee: {}", employee);
	// }


	// @Override
	// public void run(String... args) throws Exception{
	// 	LOGGER.info("Test: Adding new country.");
	// 	// Country country = countryService.findCountryByCode("IN");
	// 	// // List<Country> countries = countryService.getAllCountries();
	// 	// // for(Country country : countries){
	// 	// 	System.out.println("country "+ country.getCo_code() + " - "+ country.getCo_name());
	// 	// // }
	// 	// testAddCountry();
	// 	// testUpdateCountry();
	// 	// getStocksByPriceGreaterThan("GOOGL", new BigDecimal(1250));
	// 	getlowestXPricedStock(3);
	// }
	// private void testAddCountry(){
	// 	Country country = new Country();
	// 	country.setCode("YY");
	// 	country.setName("New Country");
	// 	countryService.addCountry(country);
	// }
	// private void testUpdateCountry() throws Exception{
	// 	countryService.updateCountryName("IN", "Hindustan");
	// }
	// private void testDeleteCountry() throws Exception{
	// 	countryService.deleteCountry("IN");
	// }
	// private void testSearchCountry() throws Exception{
	// 	List<Country> countries = countryService.findCountryByText("ou");
	// 	for(Country country : countries){
	// 		System.out.println(country.getCode() + " : " + country.getName());
	// 	}
	// }
	// private void testSearchCountrySorted() throws Exception{
	// 	List<Country> countries = countryService.findCountryByTextSorted("ou");
	// 	for(Country country : countries){
	// 		System.out.println(country.getCode() + " : " + country.getName());
	// 	}
	// }
	// private void findStocksBymonthAndYearAndCompany(){
	// 	List<Stock> records = stockRepository.findByDateBetweenAndCode(LocalDate.of(2019, 8, 31), LocalDate.of(2019, 9, 30), "FB");
	// 	for(Stock record : records){
	// 		System.out.println(record.getId() + ", " 
	// 		+record.getCode() + ", "
	// 		+record.getDate() + ", " 
	// 		+record.getOpen() + ", "
	// 		+record.getClose() + ", "
	// 		+record.getVolume() + ". ");
	// 	}
	// }
	// public void getStocksByPriceGreaterThan(String code, BigDecimal price){
	// 	List<Stock> stocks = stockRepository.findByCodeAndCloseGreaterThan(code, price);
	// 	for(Stock record : stocks){
	// 		System.out.println(record.getId() + ", " 
	// 		+record.getCode() + ", "
	// 		+record.getDate() + ", " 
	// 		+record.getOpen() + ", "
	// 		+record.getClose() + ", "
	// 		+record.getVolume() + ". ");
	// 	}
	// }
	// public void getTopXVolumedStock(int x){
	// 	List<Stock> stocks = stockRepository.findAllByOrderByVolumeDesc();
	// 	if(stocks.isEmpty()) return;
	// 	for(int i = 0; i < x; i++){
	// 		Stock record = stocks.get(i);
	// 		System.out.println(record.getId() + ", " 
	// 		+record.getCode() + ", "
	// 		+record.getDate() + ", " 
	// 		+record.getOpen() + ", "
	// 		+record.getClose() + ", "
	// 		+record.getVolume() + ". ");
	// 	}
	// }
	// public void getlowestXPricedStock(int x){
	// 	List<Stock> stocks = stockRepository.findAllByOrderByCloseAsc();
	// 	if(stocks.isEmpty()) return;
	// 	for(int i = 0; i < x; i++){
	// 		Stock record = stocks.get(i);
	// 		System.out.println(record.getId() + ", " 
	// 		+record.getCode() + ", "
	// 		+record.getDate() + ", " 
	// 		+record.getOpen() + ", "
	// 		+record.getClose() + ", "
	// 		+record.getVolume() + ". ");
	// 	}
	// }
}
