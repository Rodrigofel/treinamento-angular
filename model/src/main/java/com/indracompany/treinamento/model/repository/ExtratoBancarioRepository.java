package com.indracompany.treinamento.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.threeten.bp.LocalDate;
import com.indracompany.treinamento.model.entity.ExtratoBancario;

public interface ExtratoBancarioRepository extends GenericCrudRepository<ExtratoBancario, Long>{
	
	
	@Query(value = "select ext.* from contas con, extrato_bancario_RS_2 ext where con.id = ext.fk_ccontabancaria_id and con.agencia = :agencia and con.numero = :numero and ext.data_de_movimentacao BETWEEN :dt_inicio and :dt_fim ORDER BY data_de_movimentacao ASC ", nativeQuery = true)
	List<ExtratoBancario> findByAgenciaAndNumeroAndDataInicioAndDataFim(@Param("agencia") String agencia,@Param("numero") String numero,@Param("dt_inicio") LocalDate dt_inicio,@Param("dt_fim") LocalDate dt_fim);

}
