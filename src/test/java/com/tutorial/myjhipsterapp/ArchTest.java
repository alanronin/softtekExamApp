package com.tutorial.myjhipsterapp;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {

        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("com.tutorial.myjhipsterapp");

        noClasses()
            .that()
                .resideInAnyPackage("com.tutorial.myjhipsterapp.service..")
            .or()
                .resideInAnyPackage("com.tutorial.myjhipsterapp.repository..")
            .should().dependOnClassesThat()
                .resideInAnyPackage("..com.tutorial.myjhipsterapp.web..")
        .because("Services and repositories should not depend on web layer")
        .check(importedClasses);
    }
}
