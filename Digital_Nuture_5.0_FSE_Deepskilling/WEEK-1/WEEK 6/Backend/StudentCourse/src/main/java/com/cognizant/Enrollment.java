package com.cognizant;


import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Enrollment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String studentName;

    @Email
    @NotBlank
    private String email;

    @NotNull
    private Long courseId;

    @NotBlank
    private String semester;

    @NotNull
    private Boolean acceptedTerms;
}