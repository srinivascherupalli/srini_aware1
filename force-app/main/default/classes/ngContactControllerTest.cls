@isTest
public class ngContactControllerTest {
    
    @testSetup
    static void setup() {
        
        Account account1 = new Account();
        account1.Name = 'srini';
        insert account1;
        
        Contact contact1 = new Contact();
        contact1.FirstName = 'contact1';
        contact1.LastName = 'contact1Lastname';
        contact1.Email = 'contact1@test.com';
        contact1.AccountId = account1.Id;
        insert contact1;
    }
    
    
    @isTest
    static void testCase1() {
        
        List<Contact> contactList = [
          SELECT Id, FirstName, LastName, Email, AccountId
          FROM Contact
        ];

        User u = [
          SELECT Id
          FROM User LIMIT 1
        ];
        
        Test.startTest();

        ngContactController ng = new ngContactController();
        ngContactController.getParentContactDetailsByUserId(u.Id);
        ngContactController.getChildDetailsByParentContactId(contactList[0].Id);
        ngContactController.getContactDetailsById(contactList[0].Id);
        ngContactController.getAccountDetailsById(contactList[0].Id);
        ngContactController.getApplicationDetailsByParentId(contactList[0].Id);
        ngContactController.getApplicationDetailsById(null);
        ngContactController.cancelApplicationById(null);
        Test.stopTest();
    }
    
    
}