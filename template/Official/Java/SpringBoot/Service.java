package {{projectProps.path}}.service;

import {{projectProps.path}}.repository.{{upperFirstAndDashToCamel name}}Repository;
import {{projectProps.path}}.domain.{{upperFirstAndDashToCamel name}};
import {{projectProps.path}}.util.BeanCopy;
import {{projectProps.path}}.util.RepositoryUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class {{upperFirstAndDashToCamel name}}Service implements IService<{{upperFirstAndDashToCamel name}}> {
    @Autowired
    {{upperFirstAndDashToCamel name}}Repository {{dashToCamel name}}Repository;

    @Override
    public void save({{upperFirstAndDashToCamel name}} {{dashToCamel name}}) {
        if ({{dashToCamel name}}.getId() != null) {
            {{upperFirstAndDashToCamel name}} one = {{dashToCamel name}}Repository.findOne({{dashToCamel name}}.getId());
            {{dashToCamel name}}Repository.save(({{upperFirstAndDashToCamel name}}) BeanCopy.beanCopy({{dashToCamel name}}, one));
        } else {
            {{dashToCamel name}}Repository.save({{dashToCamel name}});
        }
    }

    @Override
    public void delete(Integer id) {
        {{dashToCamel name}}Repository.delete(id);
    }

    @Override
    public void deleteBatch(List<Integer> list) {
        {{dashToCamel name}}Repository.deleteBatch(list);
    }

    @Override
    public {{upperFirstAndDashToCamel name}} findOne(Integer id) {
        return {{dashToCamel name}}Repository.findOne(id);
    }

    @Override
    public {{upperFirstAndDashToCamel name}} findOne({{upperFirstAndDashToCamel name}} {{dashToCamel name}}) {
        {{dashToCamel name}}.setDel(0);
        return {{dashToCamel name}}Repository.findOne(Example.of({{dashToCamel name}}));
    }

    @Override
    public Long count({{upperFirstAndDashToCamel name}} {{dashToCamel name}}) {
        return {{dashToCamel name}}Repository.count(Example.of({{dashToCamel name}}));
    }

    @Override
    public List<{{upperFirstAndDashToCamel name}}> findAll({{upperFirstAndDashToCamel name}} {{dashToCamel name}}, Sort sort) {
        Specification<{{upperFirstAndDashToCamel name}}> specification = RepositoryUtil.getSpecification({{dashToCamel name}});
        return {{dashToCamel name}}Repository.findAll(specification, sort);
    }

    @Override
    public List<{{upperFirstAndDashToCamel name}}> findAll(List<Integer> list) {
        return {{dashToCamel name}}Repository.findAll(list);
    }

    @Override
    public Page<{{upperFirstAndDashToCamel name}}> page({{upperFirstAndDashToCamel name}} {{dashToCamel name}}, Pageable pageable) {
        Specification<{{upperFirstAndDashToCamel name}}> specification = RepositoryUtil.getSpecification({{dashToCamel name}});
        return {{dashToCamel name}}Repository.findAll(specification, pageable);
    }
}
