package com.tutorial.myjhipsterapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Teacher.
 */
@Entity
@Table(name = "teacher")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Teacher implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "first_name", nullable = false)
    private String firstName;

    @NotNull
    @Column(name = "last_name", nullable = false)
    private String lastName;

    @NotNull
    @Column(name = "email", nullable = false)
    private String email;

    @NotNull
    @Column(name = "address_line", nullable = false)
    private String addressLine;

    @NotNull
    @Column(name = "city", nullable = false)
    private String city;

    @Column(name = "state")
    private String state;

    @NotNull
    @Column(name = "country_code", nullable = false)
    private Integer countryCode;

    @NotNull
    @Column(name = "language_code", nullable = false)
    private Integer languageCode;

    @NotNull
    @Column(name = "phone", nullable = false)
    private Integer phone;

    @OneToMany(mappedBy = "teacher")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Course> courses = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public Teacher firstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Teacher lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public Teacher email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddressLine() {
        return addressLine;
    }

    public Teacher addressLine(String addressLine) {
        this.addressLine = addressLine;
        return this;
    }

    public void setAddressLine(String addressLine) {
        this.addressLine = addressLine;
    }

    public String getCity() {
        return city;
    }

    public Teacher city(String city) {
        this.city = city;
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public Teacher state(String state) {
        this.state = state;
        return this;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Integer getCountryCode() {
        return countryCode;
    }

    public Teacher countryCode(Integer countryCode) {
        this.countryCode = countryCode;
        return this;
    }

    public void setCountryCode(Integer countryCode) {
        this.countryCode = countryCode;
    }

    public Integer getLanguageCode() {
        return languageCode;
    }

    public Teacher languageCode(Integer languageCode) {
        this.languageCode = languageCode;
        return this;
    }

    public void setLanguageCode(Integer languageCode) {
        this.languageCode = languageCode;
    }

    public Integer getPhone() {
        return phone;
    }

    public Teacher phone(Integer phone) {
        this.phone = phone;
        return this;
    }

    public void setPhone(Integer phone) {
        this.phone = phone;
    }

    public Set<Course> getCourses() {
        return courses;
    }

    public Teacher courses(Set<Course> courses) {
        this.courses = courses;
        return this;
    }

    public Teacher addCourse(Course course) {
        this.courses.add(course);
        course.setTeacher(this);
        return this;
    }

    public Teacher removeCourse(Course course) {
        this.courses.remove(course);
        course.setTeacher(null);
        return this;
    }

    public void setCourses(Set<Course> courses) {
        this.courses = courses;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Teacher)) {
            return false;
        }
        return id != null && id.equals(((Teacher) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Teacher{" +
            "id=" + getId() +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", email='" + getEmail() + "'" +
            ", addressLine='" + getAddressLine() + "'" +
            ", city='" + getCity() + "'" +
            ", state='" + getState() + "'" +
            ", countryCode=" + getCountryCode() +
            ", languageCode=" + getLanguageCode() +
            ", phone=" + getPhone() +
            "}";
    }
}
