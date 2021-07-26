public with sharing class ngContactController {
  @AuraEnabled(cacheable=true)
  public static List<User> getParentContactDetailsByUserId(String userId) {
    return [SELECT Id, ContactId FROM User WHERE Id = :userId];
  }

  @AuraEnabled(cacheable=true)
  public static List<Contact> getChildDetailsByParentContactId(
    String parentId
  ) {
    return [
      SELECT
        Id,
        FirstName,
        LastName,
        Account.Name
      FROM Contact
    ];
  }

  @AuraEnabled(cacheable=true)
  public static List<Contact> getContactDetailsById(String contactId) {
    return [
      SELECT
        Id,
        FirstName,
        LastName,
        CreatedDate
        FROM Contact
      WHERE Id = :contactId
    ];
  }

  @AuraEnabled(cacheable=true)
  public static List<Account> getAccountDetailsById(String contactId) {
    return [
      SELECT
        Id,
        Name,
        CreatedDate,
        Phone
      FROM Account
    ];
  }

  @AuraEnabled(cacheable=true)
  public static List<Account> getApplicationDetailsByParentId(
    String contactId
  ) {
    return null;        
  }


  @AuraEnabled(cacheable=true)
  public static List<Account> getApplicationDetailsById(String applicationId) {
    return null;
  }

  @AuraEnabled
  public static List<Account> cancelApplicationById(String applicationId) {
    return null;
  }
}