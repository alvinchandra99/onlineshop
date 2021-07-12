package teamD.restAPI.model;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@SQLDelete(sql ="UPDATE tbl_product SET is_deleted = true WHERE id = ?")
@Where(clause = "is_deleted = false")
@Table(name = "tbl_product")
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String imgurl;

	private String name;

	@Column(length = 500)
	private String description;

	private int price;

	private int stock;

	private String createdAt;

	@Builder.Default
	private boolean isDeleted = false;

	private String updatedAt;

	private double star;

	private int sold;

	@ManyToOne
	@JoinColumn(name = "category_id")
	private Category category;
	
}
