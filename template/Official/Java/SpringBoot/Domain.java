package {{projectProps.path}}.domain;

{{#is props.Where "1"}}
import org.hibernate.annotations.Where;
{{/is}}
{{#is props.JsonBackReference "1"}}
import com.fasterxml.jackson.annotation.JsonBackReference;
{{/is}}
{{#is props.Date "1"}}
import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;
{{/is}}

import javax.persistence.*;
{{#is props.Date "1"}}
import java.util.Date;
{{/is}}
{{#is props.toMany "1"}}
import java.util.Set;
{{/is}}

@Entity//{{comment}}
public class {{upperFirstAndDashToCamel name}} extends IDomain {
{{#each fields}}

{{#is java.relevance "manyToOne"}}
	@ManyToOne
	@JoinColumn(name = "{{dashToCamel field}}"{{#is db.allowEmpty false}}, nullable = false{{/is}})
	{{#is java.relevanceNotJson "1"}}
	@JsonBackReference
	{{/is}}
	private {{upperFirstAndDashToCamel relTable}} {{dashToCamel displayField}};
{{else is java.relevance "oneToOne"}}
	@OneToOne
	@JoinColumn(name = "{{dashToCamel field}}"{{#is db.allowEmpty false}}, nullable = false{{/is}})
	{{#is java.relevanceNotJson "1"}}
	@JsonBackReference
	{{/is}}
	private {{upperFirstAndDashToCamel relTable}} {{dashToCamel displayField}};
{{else is java.relevance "manyToMany"}}
	//TODO: Need to define the sort
	@ManyToMany
	@OrderBy()
	{{#is java.relevanceNotJson "1"}}
	@JsonBackReference
	{{/is}}
	private Set<{{upperFirstAndDashToCamel relTable}}> {{dashToCamel field}};
{{else is java.relevance "oneToMany"}}
	//TODO: Need to define the sort
	@OneToMany
	@JoinColumn(name = "{{dashToCamel displayField}}")
	@Where(clause = "del = 0")
	@OrderBy()
	{{#is java.relevanceNotJson "1"}}
	@JsonBackReference
	{{/is}}
	private Set<{{upperFirstAndDashToCamel relTable}}> {{dashToCamel field}};
{{else}}
	{{#is java.transient true}}
	@Transient
	{{/is}}
	{{#is db.dbType "date"}}
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
	{{/is}}
	{{#is db.dbType "datetime"}}
	@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
	{{/is}}
	@Column({{#is db.allowEmpty false}}nullable = false, {{/is}}{{#is java.insertable false}}insertable = false, {{/is}}{{#is java.updateable false}}updateable = false, {{/is}}columnDefinition = "{{db.dbType}}{{#isnt db.maxlength null}}({{db.maxlength}}){{/isnt}}{{#isnt db.defaultVal null}} default '{{db.defaultVal}}'{{/isnt}} comment '[{{title}}]{{#isnt customFilter null}} {{#each customFilter}}{{@key}}:{{this}} {{/each}}{{/isnt}}'")
	private {{java.type}} {{dashToCamel field}};
{{/is}}
{{/each}}
{{#each fields}}

{{#is java.relevance "manyToOne"}}
	public {{upperFirstAndDashToCamel relTable}} get{{upperFirstAndDashToCamel displayField}}() {
		return {{dashToCamel displayField}};
	}

	public void set{{upperFirstAndDashToCamel displayField}}({{upperFirstAndDashToCamel relTable}} {{dashToCamel displayField}}) {
		this.{{dashToCamel displayField}} = {{dashToCamel displayField}};
	}
{{else is java.relevance "oneToOne"}}
	public {{upperFirstAndDashToCamel relTable}} get{{upperFirstAndDashToCamel displayField}}() {
		return {{dashToCamel displayField}};
	}

	public void set{{upperFirstAndDashToCamel displayField}}({{upperFirstAndDashToCamel relTable}} {{dashToCamel displayField}}) {
		this.{{dashToCamel displayField}} = {{dashToCamel displayField}};
	}
{{else is java.relevance "manyToMany"}}
	public Set<{{upperFirstAndDashToCamel relTable}}> get{{upperFirstAndDashToCamel field}}() {
		return {{dashToCamel field}};
	}

	public void set{{upperFirstAndDashToCamel field}}(Set<{{upperFirstAndDashToCamel relTable}}> {{dashToCamel field}}) {
		this.{{dashToCamel field}} = {{dashToCamel field}};
	}
{{else is java.relevance "oneToMany"}}
	public Set<{{upperFirstAndDashToCamel relTable}}> get{{upperFirstAndDashToCamel field}}() {
		return {{dashToCamel field}};
	}

	public void set{{upperFirstAndDashToCamel field}}(Set<{{upperFirstAndDashToCamel relTable}}> {{dashToCamel field}}) {
		this.{{dashToCamel field}} = {{dashToCamel field}};
	}
{{else}}
	public {{java.type}} get{{upperFirstAndDashToCamel field}}() {
		return {{dashToCamel field}};
	}

	public void set{{upperFirstAndDashToCamel field}} ({{java.type}} {{dashToCamel field}}) {
		this.{{dashToCamel field}} = {{dashToCamel field}};
	}
{{/is}}
{{/each}}

	public {{upperFirstAndDashToCamel name}}() {}

	public {{upperFirstAndDashToCamel name}}(Integer id) {
		this.id = id;
	}
}

