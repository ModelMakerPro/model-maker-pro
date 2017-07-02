package {{projectProps.path}}.repository;

import {{projectProps.path}}.domain.{{upperFirstAndDashToCamel name}};
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface {{upperFirstAndDashToCamel name}}Repository extends IRepository<{{upperFirstAndDashToCamel name}}> {

	@Modifying
	@Query("update {{upperFirstAndDashToCamel name}} set del=1,delDtm=current_time where id = ?1")
	void delete(Integer id);

	@Transactional
	@Modifying
	@Query("update {{upperFirstAndDashToCamel name}} set del=1,delDtm=current_time where id in (?1)")
	void deleteBatch(List<Integer> list);
}
