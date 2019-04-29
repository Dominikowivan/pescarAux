package ar.org.pescar.controller;

import org.junit.runner.RunWith;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

@DataJpaTest
@RunWith(SpringRunner.class)
public class AlumniControllerTest {
//
//
//    private AlumniController alumniController;
//    private AlumniProfileService alumniProfileService;
//
//    @Autowired
//    private AlumniProfileDAO alumniProfileDAO;
//
//    private MockMvc mockMvc;
//    private ObjectMapper objectMapper;
//    private AlumniProfile alumniProfile;
//    private Integer alumniProfileID;
//
//    @Before
//    public void setup() throws Exception {
//
//        this.alumniProfileService = new AlumniProfileService(alumniProfileDAO);
//        this.alumniController = new AlumniController(alumniProfileService);
//        this.mockMvc = standaloneSetup(this.alumniController).build();
//        objectMapper = new ObjectMapper();
//        objectMapper.registerModule(new Jdk8Module());
//
//        alumniProfile = new AlumniProfile("11373737", "12873192783", "highschool", "pepita", "Manu", 123);
//
//        Study currentStudy = new Study("Quilmes","Biologia",123,"College");
//        alumniProfile.setCurrentStudy(currentStudy);
//        alumniProfile.addToStudyHistory(new Study ("UBA","Matematica",332,"College"));
//
//        Job currentJob = new Job("Profesor",13,3333);
//        alumniProfile.setCurrentJob(currentJob);
//        alumniProfile.addToJobHistory(new Job ("Nadador",11,3325));
//
//        String json = objectMapper.writeValueAsString(alumniProfile);
//
//        MvcResult mvcResult = mockMvc.perform(post("/alumni").contentType(MediaType.APPLICATION_JSON).content(json))
//                .andExpect(status().isCreated()).andReturn();
//        String alumniProfileIdReturned = mvcResult.getResponse().getContentAsString();
//        alumniProfileID = Integer.valueOf(alumniProfileIdReturned);
//
//    }
//
//    @Test
//    public void testAlumniControllerIsNotNullAndBeanSetup() throws Exception {
//        assertThat(alumniController).isNotNull();
//    }
//
//    @Test
//    public void testAlumniPostsNewAlumniAndIsRetrieved() throws Exception {
//        AlumniProfile returnedAlumni = this.alumniProfileService.getById(alumniProfileID);
//        assertEqualAlumnis(returnedAlumni, alumniProfile);
//    }
//
//    @Test
//    public void testGetAlumniById() throws Exception {
//        ResultActions resultActions = this.mockMvc.perform(get("/alumni/" + alumniProfileID));
//        MvcResult mvcResult = resultActions.andExpect(status().isOk()).andReturn();
//        String retrievedCharString = mvcResult.getResponse().getContentAsString();
//        AlumniProfile retrievedAlumni = objectMapper.readValue(retrievedCharString, AlumniProfile.class);
//
//        assertEqualAlumnis(retrievedAlumni, alumniProfile);
//
//    }
//
//    @Test
//    public void testPutAlumniById() throws Exception {
//        AlumniProfile alumniProfileToUpdate = new AlumniProfile("9876543", "98765432", "university", "Carlos", "Maria", 524);
//
//        String json = objectMapper.writeValueAsString(alumniProfileToUpdate);
//        JSONObject jsonObject = new JSONObject(json);
//        jsonObject.put("id", alumniProfileID);
//        json = jsonObject.toString();
//
//        MvcResult mvcResult = this.mockMvc.perform(put("/alumni")
//                .contentType(MediaType.APPLICATION_JSON).content(json))
//                .andExpect(status().isOk()).andReturn();
//
//        AlumniProfile updatedAlumni = this.alumniProfileService.getById(alumniProfileID);
//
//        assertEqualsAlumniStructure(updatedAlumni, alumniProfileToUpdate);
//
//    }
//
//    @Test
//    public void testGetAllAlumni() throws Exception {
//        ResultActions resultActions = this.mockMvc.perform(get("/alumni/all"));
//        MvcResult mvcResult = resultActions.andExpect(status().isOk()).andReturn();
//        String retrievedCharString = mvcResult.getResponse().getContentAsString();
//        List<AlumniProfile> retrievedAlumnis = objectMapper.readValue(retrievedCharString, new TypeReference<List<AlumniProfile>>(){});
//
//        Assert.assertThat(retrievedAlumnis, contains(hasProperty("telephone")));
//
//        assertEquals(retrievedAlumnis.size(),1);
//
//        Stream<Class<?>> classes = retrievedAlumnis.stream().map(itemFromObjMap -> itemFromObjMap.getClass());
//        Assertions.assertThat(classes).containsOnly(AlumniProfile.class);
//    }
//
//
//
//    private void assertEqualAlumnis(AlumniProfile returnedAlumni, AlumniProfile alumniProfile) {
//        assertEqualsAlumniStructure(returnedAlumni, alumniProfile);
//        assertCurrentStudy(returnedAlumni.getCurrentStudy().get(),alumniProfile.getCurrentStudy().get());
//        assertStudyHistory(returnedAlumni.getStudyHistory(),alumniProfile.getStudyHistory());
//        assertCurrentJob(returnedAlumni.getCurrentJob().get(),alumniProfile.getCurrentJob().get());
//        assertJobHistory(returnedAlumni.getJobHistory(),alumniProfile.getJobHistory());
//    }
//
//    private void assertEqualsAlumniStructure(AlumniProfile returnedAlumni, AlumniProfile alumniProfile) {
//        assertEquals(alumniProfile.getTelephone(), returnedAlumni.getTelephone());
//        assertEquals(alumniProfile.getAlternativeTelephone(), returnedAlumni.getAlternativeTelephone());
//        assertEquals(alumniProfile.getGraduationYear(), returnedAlumni.getGraduationYear());
//        assertEquals(alumniProfile.getAlternativeTelephone(), returnedAlumni.getAlternativeTelephone());
//        assertEquals(alumniProfile.getCounselor(), returnedAlumni.getCounselor());
//        assertEquals(alumniProfile.getMaximumEducation(), returnedAlumni.getMaximumEducation());
//        assertEquals(alumniProfile.getPescarCenter(), returnedAlumni.getPescarCenter());
//    }
//
//    private void assertCurrentStudy(Study returnedStudy, Study study) {
//        assertEquals(returnedStudy.getFieldStudy(),study.getFieldStudy());
//        assertEquals(returnedStudy.getInstituteName(),study.getInstituteName());
//        assertEquals(returnedStudy.getScholarship(),study.getScholarship());
//        assertEquals(returnedStudy.getYearStudy(),study.getYearStudy());
//    }
//
//    private void assertStudyHistory(List<Study> retrievedHistory, List<Study> studyHistory1) {
//        for (int i = 0; i < retrievedHistory.size(); i++) {
//            assertCurrentStudy(retrievedHistory.get(i),studyHistory1.get(i));
//        }
//    }
//    private void assertCurrentJob(Job returnedJob, Job job) {
//        assertEquals(returnedJob.getWorkingHours(),job.getWorkingHours());
//        assertEquals(returnedJob.getGrossSalary(),job.getGrossSalary());
//        assertEquals(returnedJob.getJobDesignationName(),job.getJobDesignationName());
//    }
//    private void assertJobHistory(List<Job> returnedJobHistory, List<Job> jobHistory) {
//        for (int i = 0; i < returnedJobHistory.size(); i++) {
//            assertCurrentJob(returnedJobHistory.get(i),jobHistory.get(i));
//        }
//    }
//
}

