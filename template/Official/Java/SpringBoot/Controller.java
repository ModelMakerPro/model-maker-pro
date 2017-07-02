package {{projectProps.path}}.controller;

import {{projectProps.path}}.domain.{{upperFirstAndDashToCamel name}};
import {{projectProps.path}}.service.{{upperFirstAndDashToCamel name}}Service;
import {{projectProps.path}}.util.ResultData;
{{#each fields}}
{{#is field "user_id"}}
import {{../projectProps.path}}.util.Constant;
import {{../projectProps.path}}.domain.User;
{{/is}}
{{/each}}
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.SortDefault;
import org.springframework.web.bind.annotation.*;

{{#each fields}}
{{#is field "user_id"}}
import javax.servlet.http.HttpSession;
{{/is}}
{{/each}}
import java.util.List;

@RestController
@RequestMapping(value = "/client/{{dashToCamel name}}")
public class {{upperFirstAndDashToCamel name}}Controller {
    @Autowired
    {{upperFirstAndDashToCamel name}}Service {{dashToCamel name}}Service;

    private Logger logger = LoggerFactory.getLogger(getClass());

    @RequestMapping(value = "/save")
    public Object save(@RequestBody {{upperFirstAndDashToCamel name}} {{dashToCamel name}}{{#each fields}}{{#is field "user_id"}}, HttpSession httpSession{{/is}}{{/each}}) {
        ResultData<{{upperFirstAndDashToCamel name}}> resultData = new ResultData<>();
        {{#each fields}}
        {{#is field "user_id"}}
        User user = (User) httpSession.getAttribute("user");
        if (user == null) {
            return Constant.noLogin(resultData);
        }else {
            {{#is relTable "user"}}
            if ({{dashToCamel ../name}}.getId() == null) {
                {{dashToCamel ../name}}.setUser(user);
            }else {
                {{upperFirstAndDashToCamel ../name}} one = {{dashToCamel ../name}}Service.findOne({{dashToCamel ../name}}.getId());
                if (one.getUser().getId().intValue() != user.getId().intValue()) {
                    logger.info(Constant.NOT_ALLOW + "，更新对象用户id：" + one.getUser().getId() + "，登录用户id：" + user.getId());
                    return Constant.not_allow(resultData);
                }
            }
            {{else}}
            if ({{dashToCamel ../name}}.getId() == null) {
                {{dashToCamel ../name}}.setUserId(user.getId());
            }else {
                {{upperFirstAndDashToCamel ../name}} one = {{dashToCamel ../name}}Service.findOne({{dashToCamel ../name}}.getId());
                if (one.getUserId().intValue() != user.getId().intValue()) {
                    logger.info(Constant.NOT_ALLOW + "，更新对象用户id：" + one.getUserId() + "，登录用户id：" + user.getId());
                    return Constant.not_allow(resultData);
                }
            }
            {{/is}}
        }
        {{/is}}
        {{/each}}
        {{#is props.haveDefaultField "1"}}
        if ({{dashToCamel name}}.getId() == null) {
        {{#each fields}}
            {{#isnt db.defaultVal null}}
            {{#is java.insertable true}}
            if ({{dashToCamel ../name}}.get{{upperFirstAndDashToCamel field}}() == null) {
                {{dashToCamel ../name}}.set{{upperFirstAndDashToCamel field}}({{db.defaultVal}});
            }
            {{/is}}
            {{/isnt}}
        {{/each}}
        }
        {{/is}}
        {{dashToCamel name}}Service.save({{dashToCamel name}});
        resultData.setData({{dashToCamel name}});
        return resultData;
    }

    @RequestMapping(value = "/delete")
    public Object delete(Integer id) {
        ResultData<{{upperFirstAndDashToCamel name}}> resultData = new ResultData<>();
        {{dashToCamel name}}Service.delete(id);
        return resultData;
    }

    @RequestMapping(value = "/deleteBatch")
    public Object deleteBatch(@RequestParam List<Integer> ids) {
        ResultData<{{upperFirstAndDashToCamel name}}> resultData = new ResultData<>();
        {{dashToCamel name}}Service.deleteBatch(ids);
        return resultData;
    }

    @RequestMapping(value = "/select")
    public Object select(Integer id) {
        ResultData<{{upperFirstAndDashToCamel name}}> resultData = new ResultData<>();
        {{upperFirstAndDashToCamel name}} findOne = {{dashToCamel name}}Service.findOne(id);
        resultData.setData(findOne);
        return resultData;
    }

    @RequestMapping(value = "/findOne")
    public Object findOne({{upperFirstAndDashToCamel name}} {{dashToCamel name}}) {
        ResultData<{{upperFirstAndDashToCamel name}}> resultData = new ResultData<>();
        {{upperFirstAndDashToCamel name}} findOne = {{dashToCamel name}}Service.findOne({{dashToCamel name}});
        resultData.setData(findOne);
        return resultData;
    }

    @RequestMapping(value = "/findAll")
    public Object findAll({{upperFirstAndDashToCamel name}} {{dashToCamel name}}, @SortDefault(sort = {"id"}, direction = Sort.Direction.ASC) Sort sort) {
        ResultData<List<{{upperFirstAndDashToCamel name}}>> resultData = new ResultData<>();
        List<{{upperFirstAndDashToCamel name}}> findAll = {{dashToCamel name}}Service.findAll({{dashToCamel name}}, sort);
        resultData.setData(findAll);
        return resultData;
    }

    @RequestMapping(value = "/page")
    public Object page({{upperFirstAndDashToCamel name}} {{dashToCamel name}}, @PageableDefault(value = 50, sort = {"id"}, direction = Sort.Direction.DESC) Pageable pageable) {
        ResultData<Page<{{upperFirstAndDashToCamel name}}>> resultData = new ResultData<>();
        Page<{{upperFirstAndDashToCamel name}}> findAll = {{dashToCamel name}}Service.page({{dashToCamel name}}, pageable);
        resultData.setData(findAll);
        return resultData;
    }
    {{#each fields}}
    {{#is field "user_id"}}

    @RequestMapping(value = "/mine/findAll")
    public Object mineFindAll({{upperFirstAndDashToCamel ../name}} {{dashToCamel ../name}}, @SortDefault(sort = {"id"}, direction = Sort.Direction.ASC) Sort sort, HttpSession httpSession) {
        ResultData<List<{{upperFirstAndDashToCamel ../name}}>> resultData = new ResultData<>();
        User user = (User) httpSession.getAttribute("user");
        if (user == null) {
            return Constant.noLogin(resultData);
        }
        {{#isnt relTable "user"}}
        {{dashToCamel ../name}}.setUserId(user.getId());
        {{else}}
        {{dashToCamel ../name}}.setUser(new User(user.getId()));
        {{/isnt}}
        List<{{upperFirstAndDashToCamel ../name}}> findAll = {{dashToCamel ../name}}Service.findAll({{dashToCamel ../name}}, sort);
        resultData.setData(findAll);
        return resultData;
    }

    @RequestMapping(value = "/mine/page")
    public Object minePage({{upperFirstAndDashToCamel ../name}} {{dashToCamel ../name}}, @PageableDefault(value = 50, sort = {"id"}, direction = Sort.Direction.DESC) Pageable pageable, HttpSession httpSession) {
        ResultData<Page<{{upperFirstAndDashToCamel ../name}}>> resultData = new ResultData<>();
        User user = (User) httpSession.getAttribute("user");
        if (user == null) {
            return Constant.noLogin(resultData);
        }
        {{#isnt relTable "user"}}
        {{dashToCamel ../name}}.setUserId(user.getId());
        {{else}}
        {{dashToCamel ../name}}.setUser(new User(user.getId()));
        {{/isnt}}
        Page<{{upperFirstAndDashToCamel ../name}}> findAll = {{dashToCamel ../name}}Service.page({{dashToCamel ../name}}, pageable);
        resultData.setData(findAll);
        return resultData;
    }
    {{/is}}
    {{/each}}
}
